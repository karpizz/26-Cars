import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NoPage } from '../NoPage';
import { Link, useNavigate, useParams } from 'react-router-dom';
import defailtImg from '../../photo/default.png';

export function EditCar() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { role, cars, carTypes } = useContext(GlobalContext);
  const [car] = cars.filter(car => car.id === +carId);

  const [name, setName] = useState(car.name);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);
  const [selectCarType, setSelectCarType] = useState(car.selectedType);
  const [image, setImage] = useState(car.image);

  //fetch data for selected car to update
  // useEffect(() => {
  //   fetch('http://localhost:3001/api/carList/' + carId, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //     }
  //   }).then(res => res.json())
  //     .then(data => {
  //       if (data.status === 'ok') {
  //         updateCars(data.car)
  //         setName(data.car.name)
  //         setYear(data.car.year)
  //         setPrice(data.car.price)
  //         setSelectCarType(data.car.selectedType)
  //       }
  //     })
  //     .catch(err => console.error(err))
  // }, []);

  if (role !== 'seller') {
    return <NoPage />;
  }

  function updateName(e) {
    setName(e.target.value);
  }

  function updateYear(e) {
    setYear(e.target.value);
  }

  function updatePrice(e) {
    setPrice(e.target.value);
  }

  function updateCarType(e) {
    setSelectCarType(e.target.value);
  }

  function updateImage(e) {
    const formData = new FormData();
    formData.append('image_file', e.target.files[0]);

    fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
      .then(data => setImage(`http://localhost:3001/${data.path}`))
      .catch(err => console.log(err))
  }

  function submitHandler(e) {
    e.preventDefault();

    fetch('http://localhost:3001/api/carList/' + carId, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        newName: name,
        newYear: year,
        newPrice: price,
        newSelectCarType: selectCarType,
        newPic: image,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          navigate('/dashboard')
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="container">
      <div className="col-12 text-center mt-5"><h3>Edit car</h3></div>
      <div className="d-flex col-12 pt-3 pb-2 mb-3 text-center justify-content-center">
        <form onSubmit={submitHandler}>
          <div className="form-floating mb-3">
            <input id='name' onChange={updateName} value={name} type="text" className="form-control rounded-3" placeholder='Name' />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input id='price' onChange={updatePrice} value={price} type="text" className="form-control rounded-3" placeholder='Price' />
            <label htmlFor="price">Price</label>
          </div>
          <div className="mb-3">
            <label htmlFor="selectCarType" className="form-label">Select car type</label>
            <select onChange={updateCarType} value={selectCarType} className="form-select" id="selectCarType">
              <option value='None'>- Select</option>
              {
                carTypes.map((e) => (
                  <option key={e.type} value={e.type}>{e.type}</option>
                ))
              }
            </select>
          </div>
          <div className="form-floating mb-3">
            <input id='year' onChange={updateYear} value={year} type="text" className="form-control rounded-3" placeholder='Year' />
            <label htmlFor="year">Year</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange={updateImage} id='pic' type="file" className="form-control rounded-3" placeholder='pic' />
            <label htmlFor="pic">Picture</label>
          </div>
          <div className="form-floating mb-3">
                    <img src={image ? image : defailtImg} alt="image" style={{width: '150px'}}/>
                  </div>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" onClick={submitHandler}>Confirm</button>
          <Link className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" to='/dashboard'>Cancel</Link>
        </form>
      </div>
    </div>
  )
}