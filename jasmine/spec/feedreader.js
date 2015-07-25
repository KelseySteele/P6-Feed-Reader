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

        var i;
        var len = allFeeds.length;

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(len).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it ('url of allFeeds objects are defined and not empty', function(){
            for (i = 0; i < len; i ++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBeNull();
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it ('name of allFeeds objects are defined and not empty', function(){
            for (i = 0; i < len; i ++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBeNull();
            }
        });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        var body = document.body,
        className = className;

        //Body originally has a menu-hidden class.
        it('menu element is hidden by default', function() { 
            expect(body.className).toBe('menu-hidden');
        });
        
          /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('menu changes visibly when the menu icon is clicked', function(){
            //$('.icon-list').click();
            //On first click, menu appears and the "menu-hidden" class is removed from the body element.
            $('a.menu-icon-link').trigger('click');
            //expect(bodyClass).toBeNull();//code
            expect(body.className).not.toBe('menu-hidden');
            
            //On second click, menu dissappears and the "menu-hidden" class is added back onto the body element.
            $('a.menu-icon-link').trigger('click');
            expect(body.className).toBe('menu-hidden');
        }); 

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    
    describe('Initial Entries', function() {
         /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
            
        //Make sure that the async project finishes before the test.
        beforeEach(function(done){
            loadFeed(0, function(){
               done(); 
            });
        });
        
        //Test for at least one entry element within the feed container.
        it('feed contains at least one entry element', function(done){
            var feedContainer = $('div.feed.article.article.entry');
            expect(feedContainer).toBeDefined();
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function() {
        var feed1;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //Make sure the async project finishes before the test.
        beforeEach(function(done){
            loadFeed(1, function(){
                feed1 = $('.feed').html();
               done(); 
            });
        });
        
        //Test that a new feed is loaded and the content changes.
        it('content of first two feeds change', function(done){
            loadFeed(0, function(){
                expect($('.feed').html()).not.toEqual(feed1);
                done();
            });
        });
        
    });

}());
