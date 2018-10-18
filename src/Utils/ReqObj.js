 const ReqObj = {
  "from" : 0,
  "size" : 700,
  "query" : {
    "bool" : {
      "must" : [
        {
          "multi_match" : {
            "query" : "1",
            "fields" : [
              "label",
              "labelNo",
              "chapterTitle",
              "chapterNo",
              "term",
              "type",
              "definition",
              "pageTitle",
              "content",
              "tag",
              "authoredText"
              
            ],
            "type" : "phrase_prefix",
            "operator" : "OR",
            "slop" : 0,
            "prefix_length" : 0,
            "max_expansions" : 1000,
            "lenient" : false,
            "zero_terms_query" : "NONE",
            "boost" : 1.0
          }
        }
      ],
      "filter" : [
       {
         "terms" : {
           "indexId.raw" : [
             "a9866c5e-28a4-422f-bf2d-2dc6a9b3a103"
           ],
           "boost" : 1.0
         }
       }
     ],
      "disable_coord" : false,
      "adjust_pure_negative" : true,
      "boost" : 1.0
    }
  },
  "_source" : {
    "includes" : [
      "pageUrn",
      "pageUrl",
      "figureType",
      "label",
      "labelNo",
      "chapterTitle",
      "chapterNo",
      "sortNo",
      "itemId",
      "term",
      "definition",
      "authoredText",
      "path",
      "pageTitle",
      "title"
    ],
    "excludes" : [ ]
  },
  "sort" : [
    {
      "sortNo" : {
        "order" : "asc"
      },
      "_score" : {
        "order" : "desc"
      }
    }
  ],
  "highlight" : {
    "require_field_match" : false,
    "fragment_size":0,
    "type" : "unified",
    "fields" : {
      "label" : { },
      "labelNo" : { },
      "chapterTitle" : { },
      "chapterNo" : { },
      "term" : { },
      "definition": { },
      "pageTitle": { },
      "content": { },
      "authoredText": { }
    }
  }
};

export default ReqObj;