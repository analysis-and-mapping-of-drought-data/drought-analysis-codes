import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBaraj(){
    const {id} = useParams()

    const [name, setName] = useState("");
    const [il, setIl] = useState("");
    const [yil_2010, setYil_2010] = useState(0);
    const [yil_2011, setYil_2011] = useState(0);
    const [yil_2012, setYil_2012] = useState(0);
    const [yil_2013, setYil_2013] = useState(0);
    const [yil_2014, setYil_2014] = useState(0);
    const [yil_2015, setYil_2015] = useState(0);
    const [yil_2016, setYil_2016] = useState(0);
    const [yil_2017, setYil_2017] = useState(0);
    const [yil_2018, setYil_2018] = useState(0);
    const [yil_2019, setYil_2019] = useState(0);
    const [yil_2020, setYil_2020] = useState(0);
    const [yil_2021, setYil_2021] = useState(0);

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response = await axios.get("http://localhost:3001/api/barajlar/"+id);
                console.log(response);
                setName(response.datan.name)
                setIl(response.data.il)
                setYil_2010(response.data.yil_2010)
                setYil_2011(response.data.yil_2011)
                setYil_2012(response.data.yil_2012)
                setYil_2013(response.data.yil_2013)
                setYil_2014(response.data.yil_2014)
                setYil_2015(response.data.yil_2015)
                setYil_2016(response.data.yil_2016)
                setYil_2017(response.data.yil_2017)
                setYil_2018(response.data.yil_2018)
                setYil_2019(response.data.yil_2019)
                setYil_2020(response.data.yil_2020)
                setYil_2021(response.data.yil_2021)
            }catch(err){
                console.log(err);
            }

        }
        fetchData();
    },[id])

    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/api/barajlar/'+id, {
        name,
        il,
        yil_2010,
        yil_2011,
        yil_2012,
        yil_2013,
        yil_2014,
        yil_2015,
        yil_2016,
        yil_2017,
        yil_2018,
        yil_2019,
        yil_2020,
        yil_2021
    })
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
          <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleUpdate}>
              <h2>Add User</h2>
              <div className="mb-2">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">il</label>
                <input
                  type="text"
                  placeholder="il gir "
                  className="form-control"
                  onChange={(e) => setIl(e.target.value)}
                />
              </div>
             
              <div className="mb-2">
                <label htmlFor="">2010</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2010(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2011</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2011(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2012</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2012(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2013</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2013(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2014</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2014(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2015</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2015(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2016</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2016(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2017</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2017(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2018</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2018(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2019</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2019(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2020</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2020(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="">2021</label>
                <input
                  type="text"
                  placeholder="Enter Age"
                  className="form-control"
                  onChange={(e) => setYil_2021(e.target.value)}
                />
              </div>
              <button className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      );

}
export default UpdateBaraj