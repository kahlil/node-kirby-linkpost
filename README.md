# node-kirby-linkpost

[![Greenkeeper badge](https://badges.greenkeeper.io/kahlil/node-kirby-linkpost.svg)](https://greenkeeper.io/)

Create a new link post entry in a Kirby blog using the command line.

## Requirements

You need to have node and npm installed and a [Kirby](http://getkirby.com) blog setup as described [in this blog post by the creator of Kirby](http://getkirby.com/blog/how-to-build-a-blog).

You also need to set up a custom post type for link posts as discribed in [this blog post](http://getkirby.com/blog/custom-post-types). The textfiles for link post have to be called `article.link.txt` as proposed in that post.

You need to create at least the first post manually if you don't have any posts yet.

## Getting Started
Install the module with: `npm install -g kirby-linkpost`

## Documentation

To create create a new link post in your Kirby blog setup move into the directory of your Kirby blog
e.g.:

```bash
cd ~/Dropbox/code/myAwesomeKirbyBlog
```

and call

```bash
klp 'Title Of Post' http://externallink.com
```

The second argument providing the external link is optional.

The script will create a new directory in `/content/01-blog/`. The name of of the directory will be prefixed with the correct number followed by a slug generated from the provided title of the post.

Then it will create a file in that directory called `article.link.txt` and fill in the template for a link post including title and the external link if a second argument is provided.

And lastly it opens that file with the `subl` command. If you want the script to open it with a different text editor you will have to provide a different command in the script directly.

Just set `var callFavTextEditor = 'subl'` to the command of your choice.

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Release History
v0.1.0 Initial release. No bugs. Only features. :)

## License
Copyright (c) 2012 Kahlil Lechelt
Licensed under the MIT license.
