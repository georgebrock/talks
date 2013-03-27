# Sleeping with the enemy

## Proposal for Ruby Manor

In this talk we'll go off the Rails and take a look at what our Pythonista
cousins are doing with Django. Why talk about Python at a Ruby conference?
Seeing another way of doing things forces us to think about what we're doing,
challenges or validates the assumptions we make about our work, and inspires
us to try new things.

I'll start by showing the building blocks of a basic Django blog application to
give a quick tour of how a Django app fits together. This won't involve any
live coding, instead I'll use a carefully prepared Git repository to show how
the app is built in two or three steps.

Once we have set the stage, I'll use the demo application to talk about some of
the design decisions in Django and how they compare to Rails. I'll be focusing
on the places I think Django has made better choices than Rails, because that's
where we can learn the most.  You'll see convention over configuration in places
you didn't expect it, why Django doesn't need `attr_accessible` *or* strong
parameters, how the template method pattern could change your life, and a lot of
significant whitespace.

I'll point to a few examples of Rails gems that have Django-like properties, but
the main aim of the talk is to see some unfamiliar ideas and think a little bit
differently.
