import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'
import { buildApiUrl } from '../config/api'

const CHECKOUT_STORAGE_KEY = 'kapt-diecast-checkout-details-v1'

const defaultFormState = {
  first_name: '',
  last_name: '',
  company_name: '',
  country: 'Vietnam',
  street_address: '',
  apartment: '',
  city: '',
  postcode: '',
  phone: '',
  email: '',
  notes: '',
}

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(Math.round(Number(price) || 0))

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState(defaultFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const shippingFee = cartItems.length > 0 ? 50000 : 0
  const total = subtotal + shippingFee

  useEffect(() => {
    const storedDetails = window.localStorage.getItem(CHECKOUT_STORAGE_KEY)
    if (!storedDetails) return

    try {
      const parsedDetails = JSON.parse(storedDetails)
      setFormData((currentState) => ({ ...currentState, ...parsedDetails }))
    } catch {
      window.localStorage.removeItem(CHECKOUT_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const orderItems = useMemo(
    () =>
      cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        sku: item.sku || null,
        quantity: item.quantity,
        unit_price: Number(item.price) || 0,
        line_total: (Number(item.price) || 0) * item.quantity,
        image_url: item.image || null,
      })),
    [cartItems],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentState) => ({
      ...currentState,
      [name]: value,
    }))
  }

  const handlePlaceOrder = async (event) => {
    event.preventDefault()

    if (cartItems.length === 0) {
      setError('Your cart is empty. Add at least one item before checking out.')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch(buildApiUrl('/orders'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subtotal,
          shipping_fee: shippingFee,
          total,
          items: orderItems,
        }),
      })

      if (!response.ok) {
        throw new Error('Unable to place your order right now.')
      }

      const order = await response.json()
      clearCart()
      window.localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(formData))
      setSuccessMessage(`Payment successful. Order ${order.order_number} has been confirmed.`)
    } catch (requestError) {
      setError(requestError.message || 'Unable to place your order right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 px-5 py-10 lg:py-14">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-start">
          <section className="w-full lg:w-[58%]">
            <div className="mb-8 flex items-end justify-between border-b border-white/15 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-500">Guest checkout</p>
                <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-wide lg:text-4xl">Billing details</h1>
              </div>
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white"
              >
                Back to cart
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  <span>First name *</span>
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  <span>Last name *</span>
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-semibold text-white/90">
                <span>Company name (optional)</span>
                <input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-white/90">
                <span>Country / Region *</span>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                >
                  <option value="Vietnam">Vietnam</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Malaysia">Malaysia</option>
                </select>
              </label>

              <label className="space-y-2 text-sm font-semibold text-white/90">
                <span>Street address *</span>
                <input
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleChange}
                  required
                  placeholder="House number and street name"
                  className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                />
              </label>

              <label className="space-y-2 text-sm font-semibold text-white/90">
                <span>Apartment, suite, unit, etc. (optional)</span>
                <input
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, etc."
                  className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  <span>Town / City *</span>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  <span>Postcode / ZIP</span>
                  <input
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  <span>Phone *</span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-white/90">
                  <span>Email address *</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-semibold text-white/90">
                <span>Order notes (optional)</span>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="w-full border border-white/20 bg-white px-4 py-3 text-black outline-none transition-colors focus:border-red-500"
                />
              </label>

              {error ? (
                <div className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {successMessage}
                </div>
              ) : null}
            </form>
          </section>

          <aside className="w-full border border-white/20 p-6 lg:sticky lg:top-28 lg:w-[42%]">
            <h2 className="text-2xl font-extrabold text-white">Your order</h2>

            <div className="mt-8 space-y-5 text-sm text-white/75">
              <div className="flex justify-between border-b border-white/20 pb-4 font-bold uppercase tracking-[0.2em] text-white">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {cartItems.length === 0 ? (
                <p className="rounded border border-white/10 bg-white/5 px-4 py-4 text-white/70">
                  Your cart is empty. <Link to="/products" className="text-red-400 underline">Browse products</Link>.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 border-b border-dashed border-white/15 pb-5">
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
                        {item.scale || 'Model'} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-white">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))
              )}

              <div className="flex justify-between border-b border-dashed border-white/15 pb-4">
                <span>Subtotal</span>
                <span className="font-medium text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-white/15 pb-4">
                <span>Shipping</span>
                <span className="font-medium text-white">{formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold uppercase tracking-[0.18em] text-white">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-8 rounded border border-sky-300/40 bg-white/95 px-5 py-5 text-center text-sm leading-7 text-slate-600">
              Sorry, it seems that there are no available payment methods.
              <br />
              This is a test checkout, so placing the order will automatically succeed.
            </div>

            <p className="mt-6 text-sm leading-7 text-white/45">
              Your personal data will be used to process your order, support your experience throughout this website, and confirm your order by email through AWS SES.
            </p>

            <button
              type="submit"
              onClick={handlePlaceOrder}
              disabled={isSubmitting || cartItems.length === 0}
              className="mt-8 w-full bg-[#d32d27] px-5 py-4 text-sm font-extrabold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#b7231f] disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
            >
              {isSubmitting ? 'Processing...' : 'Place order'}
            </button>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
