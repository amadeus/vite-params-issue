# React Router useParams Bug

## Setup

This is a quick boilerplate react router 7 project using vite. I used bun as as
the package manager, however any other one should work (yarn, npm, etc) should
work.

The usual react router/vite setup commands should work:

```bash
npm install
npm run dev
```

## Context

Essentially I have noticed what appears to be both unintended and inconsistent
results in how `useParams` broadcasts param changes to components but before I
get into that, I need to outline the setup of the project:

If you check [`routes.ts`](/app/routes.ts) you'll see there are simply 3 routes

- [`/`](/app/routes/home.tsx) - a page with the title `Home` and a link to page
  `/one`
- [`/one`](/app/routes/one.tsx) - a page with the title `Page 1`, and links to
  `/one/two` and `/`
- [`/one/two`](/app/routes/two.tsx) - a page with the title `Page 2` and links
  back to `/one` and `/`

Furthermore, each page exports a default
[`RouteWrapper`](/app/routes/home.tsx#L6) component for their respective route,
and includes a nested memo'd [`Content`](/app/routes/home.tsx#L11) component
which renders the previously mentioned content.

Because the `Content` component is wrapped in a `memo` and never passed any
props, it should never re-render due to the `RouteWrapper`, only once on
initial mount. All subsequent re-renders of `Content` are therefore triggered
by `useParams`.

I've included 2 generic components that are rendered out by each `Content`
component:

- [`Wrapper`](/app/routes/Wrapper.tsx) -- a generic wrapper component that
  renders the title and the links so they all look the same. It also includes a
  [`useEffect`](/app/routes/Wrapper.tsx#L11-L14) which logs every render (no
  dep array) whether params have changed since last render and what the params
  actually are
- [`ButtonLink`](/app/routes/ButtonLink.tsx) -- a simple generic wrapper around
  react-router `Link` component that also emits a `console.log`
  [`onMouseDown`](/app/routes/ButtonLink#L12) to help contextualize the
  different `useEffect` calls that take place

Also it finally should be noted that I ran a `bunx react-router reveal` to
[remove](./app/entry.client.tsx#L6-L8) the React StrictMode wrapper to both
make these issues easier to follow and understand (logs would become extremely
noisy with it on).

## Issues / Scenarios

With all this context, here are the following issues I see:

- On initial page load, `useParams` issues an extra render after mount with
  identical values for params. The logs will look something like this:
  - `Home Page rendered, params changed: false, {}`
  - `Home Page rendered, params changed: true, {}`
- When clicking a link to navigate TO any page BUT home/index, you'll see the following logs:
  - `Mouse down on Page 1 link` -- triggered by ButtonLink
  - `Home Page rendered, params changed: true, {}` -- happens before the navigation
  - `Page 1 rendered, params changed: false, {one: 'one'}` -- the mount of Page 1
  - `Page 1 rendered, params changed: true, {one: 'one'}` -- a second render of Page 1
- When clicking a link TO `/` FROM either `/one` or `/one/two`, you'll see the following logs:
  - `Mouse down on Home link` -- triggered by ButtonLink
  - `Home Page rendered, params changed: false, {}` -- the Home Page mounting

So to summarize, it appears there are a series of different phantom renders
that can be consistently triggered in different contexts. There's perhaps a
different discussion around whether it's ok for these renders to happen or not,
but I would argue that it goes against the expectations of the API --
`useParams` should only update when params change. While we can work around
these problems, it's really a hidden footgun that would work against a
developer's expectations -- in other words, it's hard to optimize against if
you don't know it's happening in the first place.

In summary the issues are:

- Initial page load seems to trigger a second render
- Navigating pages triggers both a phantom render of existing pre-navigation
  params and then proceeds to navigate and issue a double render with the new
  params
- Navigating back to `/` or index seems to be the only navigation that works as
  I would expect to. Issuing no double renders on mount and no pre-navigation
  ghost render

I briefly looked at the source code for useParams and saw that it is hooked up
to a ContextProvider that appears to house a bunch of other data around
navigation and routing, and I expect the double renders are most likely being
triggered here, however the stability of the params object is also something
that should be fixed since it makes it harder to internally optimize a
component for the results of the hook as well.
