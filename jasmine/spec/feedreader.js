/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('should have a URL', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe();
            });
        });
        
        it('should have a name', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe();
            });
        });
    });


    /*  The section for the menu. Testing that the menu stats out hidden, 
        shows when it is clicked and hides again when clicked another time.
        It does this by looking for the class which contains the perameters.*/

    describe('The menu', function() {

        it('should be hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('should open on click', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        it('should close on click', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /*  The section for the initial entries. Testing that articles are 
        originally loaded on the screen. It is looking for data to be 
        within the function. */
    
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should load an entry', function(done) {
            expect($('.entry')[0]).toBeDefined();
            done();
        });
    });

    /*  The section for the next set of articles. Testing that articles change 
        to another set of articles. This is visually apparent on the screen. */

    describe('New Feed Selection', function() {
        var entriesAtCall1, entriesAtCall2;

        beforeAll(function(done) {
            expect($('.entry')).not.toBe();
            loadFeed(1, function(){
                entriesAtCall1 = $('.entry');
                loadFeed(0, function() {
                    entriesAtCall2 = $('.entry');
                    done();
                })
            });
        });

        it('should change content', function(done) {
            expect(entriesAtCall1).toBeDefined();
            expect(entriesAtCall2).toBeDefined();
            expect(entriesAtCall2[0].firstChild.nextSibling.innerHTML).not
                .toEqual(entriesAtCall1[0].firstChild.nextSibling.innerHTML);
            done();
        });
    });
});
