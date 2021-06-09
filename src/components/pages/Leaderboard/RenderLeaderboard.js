import React from 'react';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import './Leaderboard.css';

const dummyData = [
  { clubname: 'Anderson', rating: 4.87 },
  { clubname: 'Caitlin', rating: 4.88 },
  { clubname: 'Grossman', rating: 4.89 },
  { clubname: 'Johnston', rating: 4.86 },
  { clubname: 'Marley', rating: 4.85 },
  { clubname: 'Morton', rating: 4.84 },
  { clubname: 'Notter', rating: 4.83 },
  { clubname: 'Stelle', rating: 4.82 },
  { clubname: 'Jefferson', rating: 4.81 },
];

function merge(left, right) {
  let arr = [];
  // Break out of loop if any one of the array gets empty
  while (left.length && right.length) {
    // Pick the smaller among the smallest element of left and right sub arrays
    if (left[0].rating < right[0].rating) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...arr, ...left, ...right];
}

function mergeSort(array) {
  const half = array.length / 2;

  // Base case or terminating case
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

const sortedDummyData = mergeSort(dummyData).reverse();

for (var i = 0; i < sortedDummyData.length; i++) {
  sortedDummyData[i].id = i + 1;
}

function RenderLeaderboard(props) {
  return (
    <LayoutContainer>
      <NavBar titleName={'Leaderboard'} backgroundColor="#293845" />
      <ul>
        {sortedDummyData.map(elem => (
          <div className={`li-container`}>
            <li>
              <h2 className="place">{elem.id}</h2>
              <h2 className="place">{elem.clubname}</h2>
              <h2 className="rating">{elem.rating}</h2>
            </li>
          </div>
        ))}
      </ul>
    </LayoutContainer>
  );
}
export default RenderLeaderboard;
