import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Wrapper } from "./HomePage"
import { BackButton } from "./MyPage"

const SelectingMapPage = () => {
    const navigate = useNavigate();

  return (
    <Wrapper>
        <Header/>
        <BackButton onClick={()=> navigate('/')}>◀</BackButton>
        <div>맵들</div>
    </Wrapper>
  )
}

export default SelectingMapPage
