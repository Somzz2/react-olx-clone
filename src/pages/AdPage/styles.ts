import styled from "styled-components";

type Props = {
    height: number
}

export const FakeAd = styled.div<Props>`
  background-color: #CCC; 
  height:${props => props.height || 20}px;
  animation: fadeIn 5s linear infinite;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;



export const PageArea = styled.div`
display: flex;
margin-top: 20px;
  .box{
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc;
  margin-bottom: 20px;
}
.box--padding{
  padding: 10px;
}
  .leftSide {
  flex: 1;
  margin-right: 20px;
  .box{
    display: flex;
  }
    
    .adImage { 
      width: 320px;
      height: 320px;
      margin-right: 20px;
      .each-slide img{
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        height: 320px;
      }
    }
    .adInfos{
    flex: 1;
      .adName{
        h2{
          margin-top:20px;
        }
        small{
          color: #999;
        }
      margin-bottom: 20px;
    }
      .adDescription{ 
        small{
          color: #999;
        }
      }
  }
}
  .rightSide {
  width: 250px;
  .price span{
    color:#00F;
    display:block;
    font-size:27px;
    font-weight:bold;
  }
  
  .contactSellerLink{
    background-color:#00F;
    color:#FFF;
    height:30px;
    border-radius:5px;
    box-shadow:0px 0px 4px #999;
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
    margin-bottom:20px;
  }
  .c--Bay small{
    display:block;
    color:#999;
    margin-top:10px;
  }
  .c--Bay strong{
    display:block;
  }
}
@media (max-width: 600px) {
  &{
    flex-direction: column;
  }
  .leftSide {
    margin-right: 0;
    .box{
      margin:auto;
      width: 320px;
      flex-direction: column; 
    }
    .adInfos{
      padding: 10px;
    }
  }
  .rightSide {
    width: auto;
    margin-top: 20px;
    .box{
      margin:auto;
      width: 320px;
      flex-direction: column; 
    }
    .contactSellerLink{
      width: 320px;
      margin: 20px auto;
    }
  }
}

@media (max-width: 600px) {

  flex-direction: column;

  .leftSide {
    margin: 0;

    .box {
      width: 320px;
      flex-direction: column;
      margin: auto;
    }

    .adInfo {
      padding: 10px;
    }
  }

    .rightSide {
      width: auto;
      margin-top: 20px;

      .box {
        width: 320px;
        margin: auto;
      }

      .contactSellerLink {
        width: 320px;
        margin: 20px auto;
      }
  }
}
`;

export const OthersArea = styled.div`
h2{
  font-size:20px;
}
.list{
    display:flex;
    flex-wrap:wrap;
    
    .aditem{
      width:25%;
    }
  }
  @media (max-width: 600px) {
    &{
      margin: 10px;
    }
    .list .aditem{
      width:50%;
    }
  } 

  @media (max-width: 600px) {
    margin: 10px;

    .list .aditem {
      width: 50%;
    }
  }

`;

export const BreadChumb = styled.div`
  font-size:13px;
  margin-top:20px;
  a{
    display:inline-block;
    margin: 0 5px;
    text-decoration:underline;
    color:#000;
  }
  @media (max-width: 600px) {
    &{
      margin:20px;
    }
  }
`