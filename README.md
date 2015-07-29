# Feed Reader Project 

### Overview
The purpose of this project was to use Jasmine 2.1 to test an existing web-based application that uses RSS feeds. I used Jasmine to make sure that the application was working properly.

Click on the index.html page to open the application. The application will begin with a feed of four links to the most recent articles in the Udacity Blog. Click on the list/sandwich icon in the upper left hand corner to open up a menu that lists links to feeds of Udacity blog articles, CSS Tricks, HTML5 Rocks articles, and Linear Digressions links. 

Each of these links will change the content of the displayed list of links in the main section of the index.html page to be from the corresponding clicked feed. 

I used Jasmine to make sure that the feeds for each of the different topics contained at least one link. I also tested the menu on the left hand-side of the page to make sure that it was showing and hiding correctly. After that, I also tested that the feed was loading asynchronously.  

## Tests
### Test that the allFeeds array exists. 
After looking through the documents given to me, I determined that the “allFeeds” variable was an array containing the information for each of the four feeds (listed in the menu).

In the feedreader.js page, I tested that the “allFeeds” variable existed by writing a simple jasmine test that expected “allFeeds” “toBeDefined”. 

I also wrote a test that determined if the “allFeeds” was full by determining that the length of the array was not 0, in other words the test showed, that there was at least one feed object present within the array of feeds. 

I used the Jasmine Documentation for Jasmine 2.1 as a reference in writing these tests. You can find the documentation here:

http://jasmine.github.io/2.1/introduction.html

### Test that each feed’s name and url is defined and present. 
These tests were similar to the test for the “allFeeds” array. I tested that the name and url variables were defined. I also tested that they were defined by confirming that the value was not null and that their length was greater than 1. 

Originally, these tests were placed within a for-loop. The loop tested for a name and url for each of the feeds within the “allFeeds” array. However, a Udacity reviewer suggested that I use a forEach loop. 

I found a really great post about the forEach loop at StackOverflow. Here is the link:
http://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript 

The forEach loop is much simpler than my original for-loop and it’s nice that I don’t have to create an index variable. It’s also the most recent standard for loops in JavaScript, although it doesn’t work natively on older browsers.

These tests and the test for the “allFeeds” array were organized within the same test suite named “RSS Feeds”. 


### Test that the menu is hidden on default.
I created another test suite with the name “menu”. I wanted to test that the menu was hidden when the page initially loaded. In order to do this, I had to figure out how the application was hiding and showing the menu on the left hand side. 

Using the dev tools, I surmised that the menu was hidden when the body element had a class of “menu-hidden”. When the menu icon in the upper left was clicked, I noticed that the “menu-hidden” class was removed from the body class. 

The “menu-hidden” class had a “translate 3d” value of (-12, 0, 0) and “menu” class had a “translate 3d” value of (0, 0, 0). Based upon the explanation from Web Platform, I understood this to mean that when the “menu-hidden” class was present, the menu shifted from it’s left hand corner starting at the x value of 0 to starting at the x value of -12. At this point, the menu is hidden. I referenced this link from Web Platform:
https://docs.webplatform.org/wiki/css/functions/translate3d()

Within the menu test suite I created the variable “bodyClass” which was equal to “document.body.className”. I then wrote a test that expected the “bodyClass” to be “menu-hidden”. This test made sure that the body had a class of “menu-hidden” upon the first page load. 

### Test that the menu changes visibly when the menu icon is clicked.
Within the test suite named “menu”, I also wanted to test to make sure that the class “menu-hidden” disappeared and then reappeared when the menu-icon was clicked and then clicked again. 

Using the dev tools, I knew that I would be working with the icon identified as “a.menu-icon-link” and a click function. I experimented with using a spy feature mentioned in the Jasmine documentation, but this resulted in quite a bit of frustration. After posting this problem to the Udacity forum, I was pointed towards the much simpler direction of triggering a click event.

I wrote two expect statements within the same test. The first statement, expected the class name of the body to not be “menu-hidden” and the second one, expected the class name to be “menu-hidden”. I then used a trigger method to test the click function on the menu-icon, before running each of the expect statements.

I actually had a bit of trouble with this as my test kept failing with the message that I was expecting “menu-hidden” not to be “menu-hidden”. I ended up splitting the variable “bodyClass”, which I had defined within the entire test suite (named “menu”) into two variables: body and className. I defined “body” as “document.body” and className as className. 

I figured out that the one variable hadn’t worked because it was assigning the class name, “menu-hidden” to the body element within each of the test. 

### Test that the loadFeed() function is called asynchronously. 
The “loadFeed()” function uses Google’s Feed Reader API to append the four most recent articles onto their corresponding feed page. 

To test that this was being done asynchronously, I created a new test suite named “Initial Entries” and included a “beforeEach” and “done()” function that made sure the loadFeed function loaded before the expectation test. 

### Test that there are four entry elements within the feed element.
I knew that I needed to have a test that showed that the “article.entry” element was within the “div.feed” element, so within the test suite, I created variables to hold them called entryElement and feedContainer. 

I tried different matchers such as “has” and “hasClass” to see if I could simply use these two elements, but this kept resulting in failed tests. I then just ended up testing to see if these two elements existed by running “expect(entryElement).toBeDefined()” and “expect(feedContainer).toBeDefined()”. Both of these tests resulted in successful specs. 

I saw that there was an article element between the article.entry and div.feed elements and figured that that was probably why I couldn’t just compare these two elements. 

I then got rid of the two variables and wrote this:

Var feedContainer = $('div.feed’),
Article = $(feedContainer.article),
entryElement= $(article.entry);

expect(entryElement).toBeDefined; 

I knew from this that this “entryElement” would only be defined if it were within the div.feed element. 

After looking at these variables, I simplified it down into one variable. This is what it looked like originally:

var feedContainer = $('div.feed.article.article.entry'); 

After my code was reviewed, it was pointed out that the feed container always has an object defined, but it doesn’t necessarily mean that the object contains anything. 

In order to fix this, I kept in mind that the “entry” element, within the feed class would only exist within the feed class. So, I ran a test that expected the element with the class name of “entry” to be defined. I also created a test that expected the length of the html content of the “entry” class to be greater than 0. I deleted the “feedContainer” variable and replaced it with a variable called “entry”, which is equal to “$('.entry')”.

After a second revision, I ended up replacing the "entry" variable with "entries", which is now equal to "$('.feed .entry')". I also added the expectation that these entries' length would be four, since there are four entries within the feed container. 

### Test that the content changes with each new feed.
The final test suite was called “New Feed Selection” and its purpose was to test that the feed did indeed load new content when another feed was clicked.

Similarly to the last test, I used a “beforeEach” and “done” function to make sure that the “loadFeed” function for the second list of feeds (which I defined as var feed1) had loaded asynchronously before testing the content that resulted from the first “loadFeed” function. 

I then, ran a test that confirmed that the content of the first “loadfeed” was not equal to the content of feed1. I used a “done” function to make sure that feed0 was loaded asynchronously before making this comparison. I found the Udacity Forum for this test very helpful. Here is the link:
https://discussions.udacity.com/t/new-feed-selection-question/16274/3 

## Summary of Resources
Here is a list of the resources that I used to complete this project. 
•	Udacity’s forums and “JavaScript Testing” online class
•	Jasmine 2.1’s documentation
•	Web Platform
•	JS Hint (for correcting syntax)


# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!


## What will I learn?

You will learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.


## How will this help my career?

* Writing effective tests requires analyzing multiple aspects of an application including the HTML, CSS and JavaScript - an extremely important skill when changing teams or joining a new company.
* Good tests give you the ability to quickly analyze whether new code breaks an existing feature within your codebase, without having to manually test all of the functionality.


# How will I complete this project?

1. Download the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader).
2. Review the functionality of the application within your browser.
3. Explore the application's HTML (*./index.html*), CSS (*./css/style.css*) and JavaScript (*./js/app.js*) to gain an understanding of how it works.
4. Explore the Jasmine spec file in *./jasmine/spec/feedreader.js*
5. Edit the allFeeds variable in *./js/app.js* to make the provided test fail and see how Jasmine visualizes this failure in your application.
6. Return the allFeeds variable to a passing state.
7. Write a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
8. Write a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
9. Write a new test suite named "The menu".
10. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
11. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
12. Write a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. Remember, loadFeed() is asynchronous so this test wil require the use of Jasmine's beforeEach and asynchronous done() function.
13. Write a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes. Remember, loadFeed() is asynchronous.
14. When complete - all of your tests should pass.
