# It's a Unix system, I know this!

Interface design applies to more than just web pages, APIs, and [file browsers
that look suspiciously like flight simulators][JurassicPark]. In this talk
you'll learn how to use Ruby to build robust, useful command line applications
that will delight their users.

I'll build a simple command line utility live on stage, and along the way we'll
learn about exit statuses, signals, man pages, input and output streams,
readline, and Unix philosophy and conventions.

As developers we spend a lot of our time using command line tools like `pry`,
`guard`, `irb`, and even the `ruby` interpreter itself. By understanding the
conventions behind these tools we can use them more effectively, and build our
own utilities that leave our users saying "it's a Unix system, I know this!"

## Notes

* Exit statuses
    * `man sysexits` on BSDish systems
* Handling signals
    * SIGINT
    * SIGINFO
    * ...
* Writing man pages
    * Sections, e.g. `man 2 intro`
    * `man man` will tell you about search paths
    * `whatis`
* STDOUT vs. STDERR
    * Redirection of streams
* Parameter conventions
    * Positional vs. flags
    * -v for verbosity
    * -- for the end of parameters
    * - for STDIN

* <https://twitter.com/garybernhardt/status/351732283310473217>
* <https://twitter.com/sikachu/status/359690294284910592>
* <https://twitter.com/jiboumans/status/362340410850422784>
* <http://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap12.html>
* <https://github.com/guard/guard/wiki/Add-Readline-support-to-Ruby-on-Mac-OS-X>
* <http://jan.tomka.name/sites/default/files/readline-commands.html>

[JurassicPark]: http://www.youtube.com/watch?v=dFUlAQZB9Ng

