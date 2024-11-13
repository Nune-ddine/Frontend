import styled from "styled-components"

const SnowmanResult = () => {
return (
   <Wrapper>
      <Title>눈사람이 완성되었어요!</Title>
      <Snowman />
      <NameInput placeholder="눈사람에게 이름을 지어주세요" />
   </Wrapper>
)
}

export default SnowmanResult

const Wrapper = styled.div`
   width : 100%;
   height: 70%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   border: 2px solid grey;
`

const Title = styled.div`
   font-size: 24px;
   font-weight: bold;
   margin-bottom: 20px;
`

const Snowman  = styled.div`
   width: 100px;
   height: 100px;
   background-color: #fff;
   border-radius: 50%;
`

const NameInput = styled.input`
   width: 200px;
   height: 30px;
   margin-top: 20px;
`
