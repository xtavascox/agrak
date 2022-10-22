// import {decrement, increment, incrementBy} from "../store/slices/userSlice";
// import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import '../assets/styles/home.css'
import {IUser} from "../interfaces/interfaces";
import {Card} from "../components/Card";
import {useGetUserListQuery} from "../store/apis/userApi";
import {useNavigate} from "react-router-dom";


export const Home = () => {
    // let userList: IUser[] = [];
    const {data:userList=[],isLoading} = useGetUserListQuery(undefined);
    const navigate=useNavigate();
    const handleCreate=()=>{
        navigate('/user')
    }
    return (
        <>
            {isLoading && <h1 style={{color: 'white'}}>Loading....</h1>}
            <div className='home__container'>
                <div className='home__grid'>
                    {
                        userList.map((user: IUser) => {
                            return <Card user={user} key={user.id}/>
                        })
                    }
                </div>
            </div>
            <button className='button button--float' onClick={handleCreate}>
                Create
            </button>
        </>
    )
}