/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/*
SPECIAL CREDIT goes to user MatthewCranford who helped me a lot with understanding the code! Thank you!
*/

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
      it("url is defined", function() {
        for (let feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        }
      });

      /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
      it("name is defined", function() {
        for (let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        }
      });
    });

    /* New test suite named "The menu" */
    describe("The menu", function() {
      it("is hidden", function() {
        const body = document.querySelector("body");
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
      it("toggles on and off", function() {
        const body = document.querySelector("body");
        const menu = document.querySelector(".menu-icon-link");

        /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(false);
        menu.click();
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });
    });

    /* New test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      beforeEach(function(ok) {
        loadFeed(1, ok);
      });

      /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      it("completed", function() {
        const feed = document.querySelector(".feed");
        const entry = feed.getElementsByClassName("entry");
        expect(entry.length > 0).toBe(true);
      });
    });

    /* New test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      let firstFeed;
      let secondFeed;
      beforeEach(function(done) {
        loadFeed(0, function() {
          originFeed = document.querySelector(".feed").innerHTML;
        });
        loadFeed(1, function() {
          newFeed = document.querySelector(".feed").innerHTML;
          done();
        });
      });

      /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
      it("content records new feeds", function(done) {
        expect(originFeed !== newFeed).toBe(true);
        done();
      });
    });
  })()
);
