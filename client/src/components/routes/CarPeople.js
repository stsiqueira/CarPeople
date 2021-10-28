import PeopleCards from '../lists/PeopleCards';
import Forms from '../forms/Forms';

const CarPeople = () => {

  return (
      <div className="App">
        <div className="wrapTitle">
          <h1> GraphQL assignment - Car & People</h1>
        </div>
          <Forms />
        <PeopleCards />
      </div>
  )
}

export default CarPeople;
