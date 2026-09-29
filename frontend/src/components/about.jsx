import React from 'react'

const about = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Intro */}
        <section className="text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            About us
          </span>
          <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
            A simple way to stay on top of your day
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Todo App was built on one idea: task management shouldn't get in
            the way of getting things done. No clutter, no unnecessary
            features — just a clear, fast way to capture your tasks and
            follow through on them.
          </p>
        </section>

        {/* Mission */}
        <section className="mt-16 rounded-lg border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900">Our mission</h2>
          <p className="mt-3 text-slate-600">
            Most productivity tools try to do everything and end up doing
            nothing well. We built Todo App to do one thing — help you keep
            track of what needs doing — and do it without friction, so
            planning your day never becomes a task of its own.
          </p>
        </section>

        {/* Values */}
        <section className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Simple by design",
              body: "Every feature earns its place. If it doesn't help you manage tasks, it's not in the app.",
            },
            {
              title: "Built for daily use",
              body: "Fast to open, fast to add a task, fast to check one off. No extra steps.",
            },
            {
              title: "Your data, respected",
              body: "Your tasks are yours. We don't sell your data or clutter your inbox.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="rounded-lg border border-slate-200 bg-white p-6"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{value.body}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Ready to get organized?
          </h2>
          <p className="mt-2 text-slate-600">
            Create a free account and start your first list in seconds.
          </p>
          <a
            href="/signup"
            className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Sign up for free
          </a>
        </section>
      </div>
    </div>

  )
}

export default about