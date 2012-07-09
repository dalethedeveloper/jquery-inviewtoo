jQuery InViewToo
================

A minimalist jQuery plugin to add triggers for elements entering or leaving the browser viewport.  Even on touch devices.

That's it.  Just two triggers.  Do with it what you will.


Usage
-----

Initialize on elements via `.inviewtoo` with a selector of your choice.  Then use `bind()` or `on()` to subscribe your super custom function to the **inview** and/or **leftview** events.


    <script src="//code.jquery.com/jquery-latest.min.js"></script>
    <script src="/path/to/jquery-inviewtoo.min.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
      
        $('#my_element').inviewtoo()
          .bind('inview',function(){
            console.log('Now you see me');
          })
          .bind('leftview',function(){
            console.log('Now you do not');
          });
      
      });
    </script>

Options
-------

You can pass in the following options to tailor the triggers to your needs:

**edge_threshold** (Default: 250)

Number of pixels outside the viewport to "pad" element visibility calculations with.

 
**debounce** (Default: 250)

Number of miliseconds to suspend *(in|left)view* triggers after completion.  This delay will debounce viewport changes to allow smooth changes, especially when users are mercilessly swiping across large pages on touchscreen devices.


**context** (Default: window)

The DOM context in which to calculate element visibility.  Genearlly safe to leave to default.


**Example**

    $('#my_element').inviewtoo({edge_threshold:500,debounce:100,context:'#my_area'})
      .bind('inview',function(){
        console.log('Now you see me');
      });


Compatible with
---------------

The mechanics of this plugin use basic ECMAScript calls and simple math.  It should be highly compatible and unlikely to break in the near future.

Tested with:

 * Chrome 13+
 * IE 6+
 * Firefox 4+
 * Safari 4+

...and mobile?
--------------

The `touchend` event has been tested on iPad 1-3, iPhone 3-4S and Android 1.6-4.1 to properly trigger when the viewport changes.


Inspired by
-----------

Many other "Lazy Load" style javascript plugins.

 -   The quintessential [jQuery LazyLoad](http://www.appelsiini.net/projects/lazyload)
 -   PixelTango's [Bullseye](http://static.pixeltango.com/jQuery/Bullseye/)

Bullseye is great, but I wanted the context to bind to a single refresh function with a quick local array for watched elements.

Another tricky thing was dealing with triggers firing too often.  Eventually these resources on Debouncing the viewport calculation smoothed things out.

 -    Ben "Cowboy" Alman's excellent [Throttle and Debounce](http://benalman.com/projects/jquery-throttle-debounce-plugin/)
 -    Which led to a classic Unscriptable post on [Javascript Debounce](http://unscriptable.com/2009/03/20/debouncing-javascript-methods/)
 -    Ajaxian's [very simple approach](http://ajaxian.com/archives/delaying-javascript-execution) won out


