/**
 * Module dependencies
 **/

var mongoose = require('mongoose');

/**
 * @method paginate
 * @param {Object} query Mongoose Query Object
 * @param {Number} pageNumber 
 * @param {Number} resultsPerPage
 * @param {Number} listLength   maximum length of range array/2
 * Extend Mongoose Models to paginate queries
 **/

exports.paginate = function(q, pageNumber, resultsPerPage, listLength , callback){ 
    // mongoose.Model.paginate = function(q, pageNumber, resultsPerPage, callback){ 
    var model = this;
    callback = callback || function(){};

    var skipFrom = ((pageNumber -1) * resultsPerPage) ;
    var query = model.find(q).skip(skipFrom).limit(resultsPerPage);

    query.exec(function(error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            model.count(q, function(error, count) {
                if (error) {
                    callback(error, null, null);
                } else {
                    var range = {};
                    var carry = 0;
                    var pageCount = Math.ceil(count / resultsPerPage);
                    var start = pageNumber - listLength ;
                    if (start < 1 ){
                        start = 1;
                        carry = listLength - pageNumber + 1;
                    }
                    var end =  (pageNumber + listLength  + carry);
                    if (end > pageCount  ){
                        carry = pageNumber + listLength  - pageCount;
                        end = pageCount;
                        start = (start - carry ) < 1 ? 1 : (start - carry);
                    }
                    for (var i = start; i <= end ; i++) {
                        range[i] = "paginator";
                    }
                    range[pageNumber] = "paginator" + " disabled";
                    callback(null, pageCount,range, results);
                }
            });
        }
    });
}

/* EOF */
