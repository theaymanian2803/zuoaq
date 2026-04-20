import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { supabase } from '@/integrations/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronRight, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const { itemCount, setIsOpen } = useCart()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: isAdmin } = useQuery({
    queryKey: ['isAdmin', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user!.id)
        .eq('role', 'admin')
        .maybeSingle()
      return !!data
    },
  })

  // Fetch dynamic categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name')

      if (error) throw error
      return data || []
    },
  })

  // Handle clicking outside the user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      searchQuery('')
      setMobileMenuOpen(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-foreground p-1 -ml-1"
              aria-label="Open Menu">
              <Menu size={24} strokeWidth={1.5} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Eyewear Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors py-2">
                  Eyewear{' '}
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-200"
                  />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-background border border-border shadow-lg py-2 flex flex-col">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.slug}`}
                        className="px-4 py-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/about"
                className="text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link
                to="/highlights"
                className="text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
                highlights
              </Link>
            </nav>

            {/* Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Optic Modern"
                className="h-11 md:h-11 w-auto object-cover "
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4 md:gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
                className="text-foreground hover:text-muted-foreground transition-colors hidden md:block">
                <Search size={18} />
              </button>

              {/* Desktop User Menu */}
              {user ? (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="text-foreground hover:text-muted-foreground transition-colors flex items-center"
                    aria-label="User menu">
                    <User size={18} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-4 w-48 bg-background border border-border py-2 shadow-lg animate-in fade-in slide-in-from-top-2">
                      <Link
                        to="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted/50 transition-colors">
                        My Account
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm font-sans text-foreground hover:bg-muted/50 transition-colors">
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleSignOut()
                          setUserMenuOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm font-sans text-destructive hover:bg-muted/50 transition-colors">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden md:block text-foreground hover:text-muted-foreground transition-colors">
                  <User size={18} />
                </Link>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative text-foreground hover:text-muted-foreground transition-colors p-1 -mr-1 md:m-0"
                aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center font-sans font-medium">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Search Dropdown */}
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="hidden md:block pb-6 animate-in fade-in slide-in-from-top-4">
              <div className="relative max-w-2xl mx-auto">
                <Search
                  size={18}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search our collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 pl-8 pr-4 text-base font-sans text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                />
              </div>
            </form>
          )}
        </div>
      </header>

      {/* --- MOBILE FULL-SCREEN MENU --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col md:hidden animate-in slide-in-from-left-full duration-300">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
              <img
                src="/logo.png"
                alt="Optic Modern"
                className="h-6 w-auto object-contain mix-blend-multiply contrast-125"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close Menu">
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-10 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/30 border border-border rounded-none py-3 pl-10 pr-4 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
              />
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
            </form>

            {/* Main Categories */}
            <nav className="flex flex-col space-y-6 mb-auto">
              {/* Mobile Eyewear Dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="flex items-center justify-between font-serif text-3xl text-foreground hover:text-muted-foreground transition-colors w-full text-left">
                  Eyewear{' '}
                  <ChevronDown
                    size={24}
                    strokeWidth={1}
                    className={`text-muted-foreground/50 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileDropdownOpen && (
                  <div className="flex flex-col space-y-4 mt-4 ml-4 border-l border-border pl-4 animate-in fade-in slide-in-from-top-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products?category=${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-serif text-xl text-muted-foreground hover:text-foreground transition-colors">
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between font-serif text-3xl text-foreground hover:text-muted-foreground transition-colors">
                About Us{' '}
                <ChevronRight size={24} strokeWidth={1} className="text-muted-foreground/50" />
              </Link>
              <Link
                to="/highlights"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between font-serif text-3xl text-foreground hover:text-muted-foreground transition-colors">
                highlights
                <ChevronRight size={24} strokeWidth={1} className="text-muted-foreground/50" />
              </Link>
            </nav>

            {/* Account & Footer Links */}
            <div className="border-t border-border pt-8 mt-12 space-y-6">
              {user ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-sm font-sans tracking-widest uppercase text-foreground">
                    <User size={18} strokeWidth={1.5} /> My Account
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-sm font-sans tracking-widest uppercase text-foreground">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-sans tracking-widest uppercase text-destructive text-left w-full">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-sans tracking-widest uppercase text-foreground">
                  <User size={18} strokeWidth={1.5} /> Log In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
