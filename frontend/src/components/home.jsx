import React from 'react'

const home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-24 text-center">
        <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
          Stay on top of your day
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Your tasks, organized.
          <br className="hidden sm:block" />
          Your day, in control.
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-600">
          Capture what needs doing, set priorities, and check things off as
          you go. Simple todo management that stays out of your way.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/signup"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Sign up for free
          </a>
          <a
            href="/login"
            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Log in
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-24 sm:grid-cols-3">
        {[
          {
            title: "Quick capture",
            body: "Add a task in seconds, from anywhere, without breaking your flow.",
          },
          {
            title: "Set priorities",
            body: "Mark what matters most so you always know what to do next.",
          },
          {
            title: "Track progress",
            body: "Check tasks off and see how far you've come each day.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-slate-200 bg-white p-6"
          >
            <h3 className="text-base font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{feature.body}</p>
          </div>
        ))}
      </section>
    </div>
  
  )
}

export default home