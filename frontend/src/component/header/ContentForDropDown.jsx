import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import SearchEntity from './SearchEntity';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
`;

const ViewMoreWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0px auto;
`;

const ViewMoreContainer = styled.div`
  background: teal;
  border: 1px solid grey;
  padding: 10px;
  cursor: pointer;
  color: white;
  text-align: center;
  font-weight: bold;
`;

const SearchingDiv = styled.div`
  margin: 0px;
  padding: 10px;
  text-align: center;
  color: teal;
  font-size: bold;
  background: white;
`;

const NoResultFound = styled.div`
  text-align: center;
  padding: 20px;
  margin: 0px;
  color: teal;
  font-weight: bold;
  border: 1px solid teal;
`;

const topFiveSearchExtractor = (searches, number) => {
  if (searches.length <= 5) {
    return searches
  }
  var topFive = [];
  for (let i = 0; i < number; i++) {
    topFive.push(searches[i])
  }
  return topFive;
}

const ContentForDropDown = (props) => {
  const thisDD = useRef();
  const { searchResult: { search_result, searching }, hideDD, header } = props;
  const resultFiltered = topFiveSearchExtractor(search_result, 5);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (thisDD.current && header.current) {
        if (!thisDD.current.contains(e.target) && !header.current.contains(e.target)) {
          hideDD();
        }
      }
    })
    return () => {
      document.removeEventListener("click", () => console.log())
    }
    //eslint-disable-next-line
  }, [])

  return (
    <div ref={thisDD}>
      {!searching ? <Wrapper>
        {resultFiltered.map((individualSearch) => <SearchEntity individualSearch={individualSearch} />)}
        {!!(search_result.length > 5) && <ViewMoreWrapper>
          <ViewMoreContainer onClick={() => props.history.push("/test")}>
            View All result
          </ViewMoreContainer>
        </ViewMoreWrapper>}
        {(!searching && resultFiltered.length === 0) && <NoResultFound>No result found</NoResultFound>}
      </Wrapper> : <SearchingDiv> searching... </SearchingDiv>
      }
    </div>
  )
}
export default withRouter(ContentForDropDown);
