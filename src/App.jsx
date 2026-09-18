import { useState } from 'react'
import { supabase } from './lib/supabase'
import './index.css'

export default function App() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email) {
        setError('Email required')
        setLoading(false)
        return
      }

      const { error: insertError } = await supabase
        .from('landing_page_leads')
        .insert([{ email, source: 'meta_ads' }])

      if (insertError) throw insertError

      setSubmitted(true)
      setEmail('')
      
      // Redirect to cal.com after 1 second
      setTimeout(() => {
        window.location.href = 'https://cal.com/arno-de-meyer/discovery-call'
      }, 1000)
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold mb-2">Got it.</h2>
          <p className="text-zinc-600">Redirecting to book your call...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <a href="https://www.scriptandscale.co.uk" className="text-sm font-semibold text-black hover:text-zinc-600">
            Script & Scale
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          Stop losing deals in the follow-up.
        </h1>
        
        <p className="text-lg sm:text-xl text-zinc-600 mb-12 leading-relaxed">
          Most businesses lose 20-30% of their pipeline after the quote goes out. Not because the offer's weak. Because there's no process, no script, no follow-up cadence. That's the leak. We fix it.
        </p>

        {/* Three Value Bullets */}
        <div className="space-y-6 mb-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0 text-lg font-bold">01.</div>
            <div>
              <h3 className="font-semibold text-base mb-2">Your own sales script</h3>
              <p className="text-zinc-600 text-sm">Built around your business, your objections, your deal cycle. Export it as standalone HTML. Keep it even after we stop working together.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 text-lg font-bold">02.</div>
            <div>
              <h3 className="font-semibold text-base mb-2">Follow-up sequences that work</h3>
              <p className="text-zinc-600 text-sm">Specific to your close cycle. Not generic templates. Cadence, tonality, objection responses. Your team drills it until it becomes habit.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 text-lg font-bold">03.</div>
            <div>
              <h3 className="font-semibold text-base mb-2">Monthly workshops and live roleplay</h3>
              <p className="text-zinc-600 text-sm">We run the process live. You drill your last lost deal. We fix what broke it. Your team does it again next month until you own it.</p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 mb-12">
          <p className="text-sm text-zinc-600 mb-4">Why this works.</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="text-zinc-400">+</span>
              <span>10+ years closing complex B2B deals. £12k-£180k ARR range. Most recent: £60k/month SaaS deal.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-zinc-400">+</span>
              <span>Top 5% performer across 5 territories. Currently leading 8-person sales team with +25% close rate.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-zinc-400">+</span>
              <span>Fee-back guarantee: if closed deal value in your first 3 months doesn't cover what you paid, month 4 is free.</span>
            </li>
          </ul>
        </div>

        {/* CTA Form */}
        <div className="bg-cream border border-zinc-200 rounded-lg p-8">
          <h2 className="text-xl font-bold mb-2">See your pipeline leak.</h2>
          <p className="text-zinc-600 text-sm mb-6">Book 15 minutes. We'll run a diagnostic and show you exactly where the money's leaking.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-zinc-300 rounded-lg text-sm bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                disabled={loading}
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-zinc-800 disabled:bg-zinc-400"
            >
              {loading ? 'Finding your leak...' : 'Find your leak'}
            </button>
          </form>

          <p className="text-xs text-zinc-400 mt-4 text-center">No spam. One diagnostic call. That's it.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto text-center text-xs text-zinc-400">
          <p>Script & Scale. Revenue enablement for UK SMBs.</p>
        </div>
      </footer>
    </div>
  )
}
