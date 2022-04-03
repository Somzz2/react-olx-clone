import React, { useState, useEffect } from "react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import { PageContainer } from "../../components/MainComponents";
import { PageArea, FakeAd, OthersArea, BreadChumb } from "./styles";
import useApi from "../../helpers/OlxAPI";
import { useParams, Link } from 'react-router-dom';
import AdItem from "../../components/partials/AdItem";

// import { Link } from "react-router-dom";

function Page() {
  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [adInfos, setAdInfos] = useState<any>([]);

  useEffect(() => {
    const getAdInfo = async (id: any) => {
      const response = await api.getAd(id, true);
      setAdInfos(response);

      setLoading(false);
    }
    getAdInfo(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function formatDate(date: string) {
    let cDate = new Date(date);
    let months = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let cDay = cDate.getDate();
    let cMonth = months[cDate.getMonth()];
    let cYear = cDate.getFullYear();
    return `${cDay} de ${cMonth} de ${cYear}`;
  };

  return (
    <PageContainer>
      {adInfos.category &&
        <BreadChumb>
          Voce esta em :
          <Link to="/">Home</Link>
          /
          <Link to={`/ads?state=${adInfos.stateName}`}>{adInfos.stateName}</Link>
          /
          <Link to={`/ads?state=${adInfos.stateName}&cat=${adInfos.category.slug}`}>{adInfos.category.name}</Link>
          / {adInfos.title}
        </BreadChumb>
      }
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">

              {loading && <FakeAd height={300} />}
              {adInfos.images &&
                <Slide>
                  {adInfos.images.map((image: any, index: number) =>
                    <div key={index} className="each-slide">
                      <img src={image} alt="slide" />
                    </div>
                  )}
                </Slide>
              }
            </div>

            <div className="adInfos">

              <div className="adName">
                {loading && <FakeAd height={20} />}
                {adInfos.title && <h2>{adInfos.title}</h2>}
                {adInfos.dateCreated &&
                  <small>Criado em: {formatDate(adInfos.dateCreated)}</small>}
              </div>

              <div className="adDescription">
                {loading && <FakeAd height={100} />}
                {adInfos.description}
                <hr />
                {adInfos.views && <small>Visualizações: {adInfos.views}</small>}
              </div>

            </div>

          </div>

        </div>

        <div className="rightSide">
          <div className="box box--padding">
            {loading && <FakeAd height={20} />}
            {adInfos.priceNegotiable &&
              "Preco Negociavel"
            }
            {!adInfos.priceNegotiable && adInfos.price &&
              <div className="price">Preco: <span>R$ {adInfos.price}</span></div>
            }
          </div>

          {loading && <FakeAd height={50} />}
          {adInfos.userInfo &&
            <div>
              <a href={`mailto:${adInfos.userInfo.emal}`} target="_blank" className="contactSellerLink">Fale com o vendendor</a>
              <div className="box box--padding c--Bay">
                <strong> {adInfos.userInfo.name}</strong>
                <small>Email: {adInfos.userInfo.email}</small>
                <small>Estado: {adInfos.stateName}</small>
              </div>

            </div>
          }
        </div>
      </PageArea>

      <OthersArea>
        {adInfos.others &&
          <div>
            <h2>Outras ofertas deste vendedor</h2>
            <div className="list">
              {adInfos.others.map((ad:string, index: number) =>
                <AdItem key={index} data={ad} />

              )}
            </div>
          </div>
        }
      </OthersArea>
    </PageContainer>
  );
}

export default Page;