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

exports.kirby_linkpost = new KirbyLinkpost();

function KirbyLinkpost() {}

KirbyLinkpost.prototype.linkItUp = function() {

    var self     = this;
    var postsDir = process.cwd() + '/content/01-blog/';

    fs.readdir( postsDir, function( err, files ) {

        var postNumber;
        var linkPosts    = [];
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
                    self.magicallyCreateKirbyLinkPostFile( postNumber, postTitle, postsDir );
                } else {
                    self.magicallyCreateKirbyLinkPostFile( postNumber, postTitle, postsDir, externalLink );
                }
            }
        }
        else throw err;
    });
};

KirbyLinkpost.prototype.makeSlug = function( title ) {

     var slugcontent_hyphens, finishedslug;

    slugcontent_hyphens = title.replace( /\s/g, '-' );
    finishedslug        = slugcontent_hyphens.replace( /[^a-zA-Z0-9\-]/g, '' ).toLowerCase();

    return finishedslug;

};

KirbyLinkpost.prototype.magicallyCreateKirbyLinkPostFile = function( postNumber, title, postsDir, link ) {

    var callFavTextEditor = 'subl';
    var slug              = this.makeSlug( title );
    var dir               = postsDir + postNumber + '-' + slug;
    var dirFile           = dir + '/' + 'article.link.txt';
    var today             = new Date();
    var day               = today.getDate();
    var month             = today.getMonth() + 1;
    var year              = today.getFullYear();
    var externalLink      = link ? link : '';
    var text              = 'Title: ' + title + '\n\n----\n\n' +
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

// Execute
var linkPost = new KirbyLinkpost();
linkPost.linkItUp();



