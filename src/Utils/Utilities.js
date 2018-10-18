import axios from '../../node_modules/axios';
import ReqObj from './ReqObj';

let CancelToken;
let source;

export default class Utilities {
  static getSearchResults(query, indexObj) {
    let searchReqObj = ReqObj;
    const postUrl = "http://10.169.180.154:9200/citechapterindex,citeglossaryindex,citefigureindex,citepageindex,citelearningobjectiveindex/_search";
    searchReqObj.query.bool.must[0].multi_match.query = query;
    searchReqObj.query.bool.filter[0].terms['indexId.raw'].pop();
    searchReqObj.query.bool.filter[0].terms['indexId.raw'].push(indexObj.id);

    if (source) {
      source.cancel();
    } 
    CancelToken = axios.CancelToken;
    source = CancelToken.source();

    let requestObj = axios.post(postUrl,     
      JSON.stringify(searchReqObj),
      {
        headers: {
          'Content-Type': 'application/json'
        },
        cancelToken: source.token
      }).catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        // console.log('Request canceled', thrown.message);
      } else {
        console.log("Error in Ajax");
      }
    })
    .then(response => {
      if (response && response.data) {
        return Promise.resolve(response.data);
      }
    });
    return requestObj;
  }
/*
  static getWikiResults(q) {
     const url =`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${q}&callback=?`;
    axios.get(url).then((resp) => {
        console.log('resp from wiki', resp);
        return resp;
    })
  }
*/
  static map(data) {
    const types = {
      'citeglossaryindex':'glossary',
      'citefigureindex':'figure',
      'citechapterindex':'chapter',
      'citepageindex':'page',
      'citelearningobjectiveindex': 'learningObjective'
    };
    const resultObj = {
      glossary: [],
      chapter: [],
      learningObjective: [],
      figure: [],
      page: []
    };

    const getType = (indx) => {
      for (let i in types) {
        if (indx.indexOf(i) > -1) {
          return types[i];
        }
      }
    }

    if (data && data.hits.hits) {
      data.hits.hits.forEach((item, index) => {
        const itemIndex = item._index;
        const type = getType(itemIndex);
        if (type) {
          resultObj[type].push(item);
        }
      })
      resultObj.took = data.took;
      resultObj.total = data.hits.total;
    }
    return resultObj;
  }
} //End class