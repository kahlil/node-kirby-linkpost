#! /usr/bin/env node

/*
 * kirby-linkpost
 * https://github.com/kahlil/node-kirby-linkpost
 *
 * Copyright (c) 2012 Kahlil Lechelt
 * Licensed under the MIT license.
 */

var exec = require('child_process').exec;
var fs   = require('fs');

var newpostnumber, text, makeSlug, magicallyCreateKirbyLinkPostFile;
var currentDir        = process.cwd();
var postsDir          = currentDir + '/content/01-blog/';
var callFavTextEditor = 'subl';
var linkPosts         = [];

makeSlug = function( title ) {

    var slugcontent_hyphens, finishedslug;

    slugcontent_hyphens = title.replace(/\s/g,'-');
    finishedslug        = slugcontent_hyphens.replace(/[^a-zA-Z0-9\-]/g,'').toLowerCase();

    return finishedslug;
};

magicallyCreateKirbyLinkPostFile = function( postNumber, title, link ) {

    var slug         = makeSlug( title );
    var dir          = postsDir + postNumber + '-' + slug;
    var dirFile      = dir + '/' + 'article.link.txt';
    var today        = new Date();
    var day          = today.getDate();
    var month        = today.getMonth() + 1;
    var year         = today.getFullYear();
    var externalLink = link ? link : '';
    var text         = 'Title: ' + title + '\n\n----\n\n' +
                       'Link: ' + externalLink + '\n\n----\n\n' +
                       'Date: ' + month + '/' + day + '/' + year +
                       '\n\n----\n\nText:';

    fs.mkdir( dir, function( err ) {

        var child;

        if ( err ) throw err;

        fs.writeFile( dirFile, text, function (err) {

            if ( err ) throw err;

            console.log( 'It\'s saved!' );

            child = exec( callFavTextEditor + ' ' + dirFile, function( err, stdout, stderr ) {
                if (err) throw err;
                else console.log( stdout );
            });

        });
    });
};

fs.readdir( postsDir, function( err, files ) {

    var postNumber;
    var postTitle    = process.argv[ 2 ];
    var externalLink = process.argv[ 3 ];

    if ( err === null ) {
        files.forEach( function( filename ) {
            if ( /^[0-9]/.test( filename ) ) {
                linkPosts.push( filename );
            }
        });

        postNumber = parseInt( linkPosts[ linkPosts.length - 1 ].split( '-' )[0], 10 ) + 1;

        if ( postTitle === undefined ) {
            console.log('You need to provide a post title as the first argument.');
            return;
        } else {
            if ( externalLink === undefined ) {
                magicallyCreateKirbyLinkPostFile( postNumber, postTitle );
            } else {
                magicallyCreateKirbyLinkPostFile( postNumber, postTitle, externalLink );
            }
        }
    }
    else throw err;
});






