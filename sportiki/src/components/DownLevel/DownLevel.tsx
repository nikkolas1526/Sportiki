import "./DownLevel.css";
import Inst from "../../Images/Inst.png";
import Tg from "../../Images/Tg.png";
import Ds from "../../Images/Ds.png";
import Vk from "../../Images/Vk.png";
export default function DownLevel() {
  return (
    <div className="DownLevel">
      <div className="FDown">
        <div className="Contacts">
          <div className="Koko">Контакты</div>
          <div>+375-25-790-30-02</div>
          <div>buliak.nik@gmail.com</div>
        </div>
        <div className="Nets">
          <div></div>
          <div className="Insta">
            <a href="" target="_blank">
              <img src={Inst} />
            </a>
          </div>
          <div className="Tga">
            <a href="" target="_blank">
              <img src={Tg} />
            </a>
          </div>
          <div></div>
          <div></div>
          <div className="Dsa">
            <a href="" target="_blank">
              <img src={Ds} />
            </a>
          </div>
          <div className="Vka">
            <a href="https://vk.com/nekit1526" target="_blank">
              <img src={Vk} />
            </a>
          </div>
          <div></div>
        </div>
        <div className="Help">Помощь</div>
        <div className="Info">
          <div>Юридическая</div>
          <div>информация</div>
        </div>
        <div className="Time">
          <div>Пн-ПТ 9:00-21:00</div>
          <div>Сб-Вс 12:00-21:00</div>
        </div>
      </div>

      <div className="SDown">
        <div>- Nikita Buliak -</div>
        <div>2024</div>
      </div>
    </div>
  );
}
