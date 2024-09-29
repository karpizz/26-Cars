import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';
import { Link } from 'react-router-dom';
import defailtImg from '../../../photo/default.png';

export function SellerCars() {

  const { role, updateCars, cars, carTypes, message, updateMessage } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [selectCarType, setSelectCarType] = useState('');
  const [image, setImage] = useState('');
  const [filteredCarType, setFilteredCarType] = useState('All');
  const [searchTitle, setSearchTitle] = useState('');

  //fetch all car list for table
  useEffect(() => {
    fetch('http://localhost:3001/api/carList', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => updateCars(data.data))
      .catch(err => console.error(err))
  }, []);

  if (role !== 'seller') {
    return <NoPage />;
  }

  function updateName(e) {
    setName(e.target.value);
  }

  function updateYear(e) {
    if ((e.target.value).includes(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)) {
      setYear(e.target.value);
    } else {
      return;
    }
  }

  function updatePrice(e) {
    if ((e.target.value).includes(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)) {
      setPrice(e.target.value);
    } else {
      return;
    }
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

    fetch('http://localhost:3001/api/carList', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        year,
        price,
        selectCarType,
        image,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          updateMessage(data.msg);
          updateCars(data.data);
        }
      })
      .catch(err => console.error(err))
  }

  function deleteCar(id) {
    fetch('http://localhost:3001/api/carList/' + id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          updateMessage(data.msg);
          updateCars(data.data);
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-wrap flex-md-nowrap py-3 mb-3">
          <div className={`modal fade ${showForm ? 'show' : ''}`} style={{ display: `${showForm ? 'block' : 'none'}` }} id="exampleModal" tabIndex="-1">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-4 shadow mt-5">
                <div className="modal-header p-5 pb-4">
                  <h1 className="fw-bold mb-0">Fill car info</h1>
                  <button onClick={() => setShowForm(!showForm)} type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body p-5">
                  <form onSubmit={submitHandler}>
                    <div className="form-floating mb-3">
                      <input autoComplete='on' id='name' onChange={updateName} value={name} type="text" className="form-control rounded-3" placeholder='Name' required />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input autoComplete='on' id='price' onChange={updatePrice} value={price} type="text" className="form-control rounded-3" placeholder='Price' required />
                      <label htmlFor="price">Price</label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="selectCarType" className="form-label">Select car type</label>
                      <select onChange={updateCarType} value={selectCarType} className="form-select" id="selectCarType" required>
                        <option value=''>-Select car type</option>
                        {
                          carTypes.map((e) => (
                            <option key={e.type} value={e.type}>{e.type}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <input autoComplete='on' id='year' onChange={updateYear} value={year} type="text" className="form-control rounded-3" placeholder='Year' required />
                      <label htmlFor="year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={updateImage} id='pic' type="file" className="form-control rounded-3" placeholder='pic' required />
                      <label htmlFor="pic">Picture</label>
                    </div>
                    <div className="form-floating mb-3">
                      <img src={image ? image : defailtImg} alt="carPhoto" style={{ width: '150px' }} />
                    </div>
                    <button onClick={() => name && price && selectCarType && year && image ? setShowForm(!showForm) : ''} className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Confirm</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <button onClick={() => setShowForm(!showForm)} className='btn btn-primary rounded-pill px-3 my-2 col-6 col-lg-2 col-sm-auto'>Add car for sale</button>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-between">
        <div className="my-3">
          <select onChange={e => setFilteredCarType(e.target.value)} value={filteredCarType} className="form-select" id="selectCarType">
            <option value='All'>All</option>
            {
              carTypes.map((e) => (
                <option key={e.type} value={e.type}>{e.type}</option>
              ))
            }
          </select>
        </div>
        <div className="my-3">
          <input placeholder='Search by name' onChange={e => setSearchTitle(e.target.value)} value={searchTitle} type="text" name="searchTitle" id="searchTitle" />
        </div>
      </div>
      {message ? <div className="alert alert-success fade show" role="alert">{message}</div> : ''}
      <div className="table-responsive-sm min-vh-100">
        <table className="table table-striped table-hover">
          <thead className='table-dark'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Year</th>
              <th scope="col">Added</th>
              <th className='text-end'>Actions</th>
            </tr>
          </thead>
          {cars.length === 0 ? <thead><tr><th>Empty</th></tr></thead> : <tbody>
            {
              cars.filter(car => filteredCarType === 'All' ? true : car.selectedType === filteredCarType)
                .filter(car => searchTitle === '' ? true : car.name.toLowerCase().includes(searchTitle.toLowerCase()))
                .map((car) => (
                  <tr key={car.id}>
                    <td>{car.id}</td>
                    <td className='p-1'><img style={{ width: '70px' }} src={car.image} alt={car.image} /></td>
                    <td>{car.name}</td>
                    <td>{car.price} $</td>
                    <td>{car.selectedType}</td>
                    <td>{car.year}</td>
                    <td>{car.created.slice(0, 19).replace('T', ' ')}</td>
                    <td className='text-end'><Link className='btn btn-primary rounded-pill py-1 m-1 px-3' to={`${car.id}/edit`}>Edit</Link>
                      <button onClick={() => deleteCar(car.id)} className='btn btn-danger rounded-pill py-1 px-2'>Delete</button></td>
                  </tr>
                ))
            }
          </tbody>}
        </table>
      </div>
    </div>
  )
}