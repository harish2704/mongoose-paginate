
# mongoose-paginate - [![Build Status](https://secure.travis-ci.org/edwardhotchkiss/mongoose-paginate.png)](http://travis-ci.org/edwardhotchkiss/mongoose-paginate)

> Mongoose ORM (NodeJS/MongoDB) Document Query Pagination

## Installation

```bash
$ npm install mongoose-paginate
```

## Usage 

```javascript

/**
 * basic example usage of `mongoose-pagination`
 * querying for `all` {} items in `MyModel`
 * paginating by second page, 10 items per page (10 results, page 2)
 **/

var paginate = require('mongoose-paginate');
MyModel.paginate = paginate.paginate;
MyModel.paginate({}, 2, 10, 3 function(error, pageCount, range, paginatedResults) {
  if (error) {
    console.error(error);
  } else {
  	console.log('Pages:', pageCount);
    console.log(paginatedResults);
    // for express
    // res.locals.paginator = {
    // range:range,
    // page: page,
    // total: pageCount
    // }

  }
}

/* EOF */

```

## in view file using swig 

``` html

    <div class="paginator">
        <a href="?page=1" class="paginator-page"><<</a> 
        {% for classNme in paginator.range %}
        <a href="?page={{ loop.key }}" class="{{ classNme }}">{{ loop.key }}</a> 
        {% endfor %}
        <a href="?page={{ paginator.total }}" class="paginator-page">>></a> 
    </div>
<!---
Optional CSS
.paginator-current {
pointer-events: none;
color: black;
}
---!>

```

## Run Tests

``` bash
$ npm test
```

### Original Author: [Edward Hotchkiss][0]
### Modified By: [Harish.K][1]

[0]: http://edwardhotchkiss.com/
[1]: Harish.K<harish2704@gmail.com>
