import './..\\..\\table.css';
import * as React from 'react';
import FractalTop from '../../img/FractalTop.png';
import ColorsTop from '../../img/ColoringTop.png';
import AffineTop from '../../img/AffinityTop.png';
import FractalBottom from '../../img/FractalBottom.png';
import ColorsBottom from '../../img/ColoringBottom.png';
import AffineBottom from '../../img/AffinityBottom.png';
import {  useState, useEffect  } from 'react';

var imagesTop = [
  FractalTop,
  ColorsTop,
  AffineTop
]
var imagesBottom = [
  FractalBottom,
  ColorsBottom,
  AffineBottom
]
var queue = 0;
var imgPathTop = imagesTop[0] // Set original value of path
var imgPathBottom = imagesBottom[0]
function setPath() {
  queue++;
  if(queue>2){ 
    queue = 0
  }
  
  imgPathTop =  imagesTop[queue] 
  console.log(imgPathTop);
  imgPathBottom = imagesBottom[queue]
  console.log(imgPathBottom);
}
const Headings = ({ headings, activeId }) => (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id} className={heading.id === activeId ? "active" : ""}>
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`).scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            {heading.title}
          </a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child) => (
                <li
                  key={child.id}
                  className={child.id === activeId ? "active" : ""}
                >
                  <a
                    href={`#${child.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${child.id}`).scrollIntoView({
                        behavior: "smooth"
                      });
                    }}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
  
  const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = React.useState([]);
  
    React.useEffect(() => {
      const headingElements = Array.from(
        document.querySelectorAll("main h2, main h3")
      );
  
      // Created a list of headings, with H3s nested
      const newNestedHeadings = getNestedHeadings(headingElements);
      setNestedHeadings(newNestedHeadings);
    }, []);
  
    return { nestedHeadings };
  };
  
  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = [];
  
    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading;
  
      if (heading.nodeName === "H2") {
        nestedHeadings.push({ id, title, items: [] });
      } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title
        });
      }
    });
  
    return nestedHeadings;
  };
  
  const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = React.useRef({});
    React.useEffect(() => {
      const callback = (headings) => {
        headingElementsRef.current = headings.reduce((map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        }, headingElementsRef.current);
  
        // Get all headings that are currently visible on the page
        const visibleHeadings = [];
        Object.keys(headingElementsRef.current).forEach((key) => {
          const headingElement = headingElementsRef.current[key];
          if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
        });
  
        const getIndexFromId = (id) =>
          headingElements.findIndex((heading) => heading.id === id);
  
        // If there is only one visible heading, this is our "active" heading
        if (visibleHeadings.length === 1) {
          setActiveId(visibleHeadings[0].target.id);
          // If there is more than one visible heading,
          // choose the one that is closest to the top of the page
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort(
            (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
          );
  
          setActiveId(sortedVisibleHeadings[0].target.id);
        }
      };
  
      const observer = new IntersectionObserver(callback, { root: document.querySelector("iframe"), rootMargin: "100px" });
  
      const headingElements = Array.from(document.querySelectorAll("h2, h3"));
  
      headingElements.forEach((element) => observer.observe(element));
  
      return () => observer.disconnect();
    }, [setActiveId]);
  };
  
  const TableOfContents = () => {
    const [activeId, setActiveId] = React.useState();
    const { nestedHeadings } = useHeadingsData();
    useIntersectionObserver(setActiveId);
  
    return (
      <nav aria-label="Table of contents">
        <Headings headings={nestedHeadings} activeId={activeId} />
      </nav>
    );
  };
  
   var  intervalID = 0
  export default function ContentTable(){
    const [updated, setUpdated] = useState(false);

    useEffect(()=>{
      if(intervalID===0){
        console.log(intervalID);
        intervalID = setInterval(()=>{
          setPath();
          setUpdated(true);
        }, 5000);
      }
    },[]);
    useEffect(()=>{
      setUpdated(false);
    },[updated]);

    return (
      <>
      <div className="info-container ">
        <div className="main">
          <h2 id="initial-header">Довідник</h2>
          <p>Комп’ютерна графіка – дуже обширна галузь комп’ютерних знань, 
            яка пройшла розвиток як складна наукова дисципліна. Сучасна КГ визначається 
            багатьма напрямками і різноманітними застосуваннями. Для одних з них, наприклад, 
            основою є автоматизація креслення технічної документації, для інших - проблеми оперативної 
            взаємодії людини і комп'ютера.</p>
            <p>Комп’ютерна графіка – дуже обширна галузь комп’ютерних знань, 
            яка пройшла розвиток як складна наукова дисципліна. Сучасна КГ визначається 
            багатьма напрямками і різноманітними застосуваннями. Для одних з них, наприклад, 
            основою є автоматизація креслення технічної документації, для інших - проблеми оперативної 
            взаємодії людини і комп'ютера.</p>
          <h2 id="second-header">Фрактали</h2>
          <p>Фракта́л — у побутовому розумінні часто означають як деяку нерегулярну, самоподібну структуру. 
            Більш строге означення фрактала вимагає глибоких знань із курсів алгебри і математичного аналізу. 
            Поширеним є розуміння фрактала як множини, яка має властивість самоподібності, тобто такої множини, 
            що складається з частин, які є подібними до неї самої.</p>
          <p>Однак, слід зауважити, що не всі самоподібні множини є фрактальними і не всі фрактальні множини є 
            самоподібними. Наприклад, будь-який відрізок є самоподібною множиною, але водночас він не є фракталом. 
            Водночас існують фрактальні множини, які не є самоподібними.</p>
          <p>Термін фрактал увів 1975 року французький математик Бенуа Мандельброт у своїй книжці «Фрактали: випадок,
             форма, розмірність» (перекладена англійською в 1977 році).</p>
          <h3 id="third-header">Геометричні фрактали</h3>
            <div style={{display: 'flex',flexDirection: 'row'}}>
              <video controls="controls" height = {230} style={{ paddingRight: "25px"}}>
                <source src="https://d3c33hcgiwev3.cloudfront.net/PsxV5onEQR6MVeaJxAEe1g.processed/full/240p/index.webm?Expires=1668470400&Signature=QUvgGiNmibePWmDZVTuKOx7Dce-h~3wzrtYbWHBGkkDXf7shBd49~~ApyO7ZISVKJRuZYPO9f7EgqsJssh0sD5H4GR9TMH3tOZDRE-7rC1lePBckdDcwad16u7hAtB2~aA1vVG5Z6330xpraTRRqo2w959~~uGkPGqA5g2DhhTE_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" type="video/mp4"/>
              </video>
              <p style ={{marginTop: '0px ', marginBottom: '0px'}}>Фрактали цього класу найнаочніші. Цей тип фракталів 
              утворюється шляхом простих геометричних побудов. Наприклад, у двомірному випадку їх отримують за допомогою 
              деякої ламаної (або поверхні в тривимірному випадку), званої генератором. За один крок алгоритму кожен з 
              відрізків (складових ламаної) замінюється на ламану-генератор, у відповідному масштабі. У результаті 
              нескінченного повторення цієї процедури, виходить геометричний фрактал.
              Перші ідеї фрактальної геометрії виникли в ХІХ ст. Кантор за допомогою простої рекурсивної процедури 
              перетворив лінію на набір незв’язаних крапок (так званий Пил Кантора).</p>
            </div>
            <p style={{marginTop: '0px '}}> Він брав лінію і видаляв центральну 
              третину, після цього повторював те ж саме з відрізками.
              Пеано ж намалював особливий вид лінії Пеано. Для її малювання італійський математик 
              взяв квадрат і видалив у ньому нижню сторону. Утворилась крива Пеано 1-го порядку. 
              Далі вчений зменшив квадрат рівно вдвічі, і зробив його 4 копії. Дві з них поставив паралельно одна 
              одній, а інші дві ще повернув на чверть обороту в протилежні сторони та з’єднав кінці ліній квадратів 
              трьома однаковими відрізками, довжиною, що дорівнює стороні нового зменшеного квадрата. Утворилась крива 
              Пеано 2-го порядку. Процедура повторюється знову: зменшується крива 2-го порядку вдвічі, робиться 
              чотири її копії, дві з яких повертаються, і знову з’єднуються відрізками, які теж зменшені вдвічі. 
              Повторювати даний алгоритм можна до нескінченності.
            </p>
          <h3 id="fourth-header">Т-фрактал</h3>
            <div style={{display: 'flex',flexDirection: 'row'}}>
              <p style ={{marginTop: '0px ', marginBottom: '0px'}}>Сімейство Т-фракталів було вперше описане в 1977 Бенуа Мандельбротом
              у своїй книзі «Фрактальна геометрія природи». Основною особливістю цього сімейства є наявність образу букви 
              "Т". Побудова починається із синього одиничного квадрата. Перший крок: зафарбувати у центрі білим кольором 
              квадрат зі стороною 1/2. Потім потрібно подумки розділити квадрат на 4 однакові квадрати і в центрі
              кожного з них зафарбувати квадрат зі стороною 1/4. Далі кожен із цих 4 квадратів знову ділиться на 
              4 частини, всього вийде 16 квадратиків, і з кожним із них потрібно зробити те ж саме. І так далі. 
              Фрактальна розмірність зафарбованої білим кінці кінців дорівнює log24 = 2.</p>
              <video controls="controls" height = {230} style={{ paddingLeft: "20px"}}>
                <source src="https://d3c33hcgiwev3.cloudfront.net/9vmGLaPGEeilzRLZf2WxfA.processed/full/360p/index.webm?Expires=1668470400&Signature=EtaLgC-d34sX6xTUeeqtwXfBxUSOzkpbGfwTVhVYjL3luGlc0XqGYxj38HuNuu-ooyOVZJleLTiu8KRY6KQXhmvcSzVdrS2KCbbCC8rYqEEE2kAg2oG6zVG30HVAzmvvrNdrxEc-LpXnToGFokcXL0FvxATnQAqp0uhzTQlYYsQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" type="video/mp4"/>
              </video>
            </div>
            <p style={{marginTop: '0px '}}> Вона всюди щільна у 
              вихідному квадраті. Це означає, що яку б точку квадрата ми не взяли, у будь-якій, як завгодно малій,
                її околиці знайдуться зафарбовані точки. Тобто майже все стало білим — площа залишку дорівнює 0, 
                а фрактал займає площу 1. Зате довжина межі зафарбованої частини нескінченна.
            </p>
          <h2 id="fifth-header">Кольорові схеми</h2>
          <p>Ко́лірна модель — абстрактна модель опису представлення кольорів у вигляді кортежів (наборів) чисел, 
            зазвичай з трьох або чотирьох значень, званих колірними компонентами або колірними координатами. 
            Разом з методом інтерпретації цих даних (наприклад, визначення умов відтворення та / або перегляду
             — тобто завдання способу реалізації), множина кольорів колірної моделі визначає колірний простір.</p>
          <p>Також під колірною моделлю необхідно розуміти спосіб відображення колірної гами в дискретному вигляді,
             для представлення її в обчислювальних, цифрових системах. 
             Колір - це  властивість матеріальних об'єктів, яка сприймається як усвідомлене зорове відчуття та виникає
            в результаті дії на око потоків видимого електронно-магнітного випромінювання (з довжинами хвиль від 380 до 760 нм).
            Той або інший колір «привласнюється» людиною об'єкту в процесі зорового сприйняття цього об'єкту.
            Світло сприймається або безпосередньо від джерела, наприклад, від освітлювальних приладів, або як відбиття 
            від поверхонь об'єктів або заломлення при проходженні крізь прозорі і напівпрозорі об'єкти.
            Амплітуда, що визначає енергію хвилі, відповідає за яскравість кольору. Око людини - складна оптична система. 
            Фоторецептори поділяються на два види: палички і колбочки. Палички є високочутливими елементами і працюють в 
            умовах слабкого освітлення. Вони нечутливі до довжини хвилі і тому не "розрізняють" кольору.
            Колбочки, навпаки, "розрізняють" колір. Саме поняття кольору є особливістю людського "бачення" навколишнього 
            середовища. Перехід від одного кольору до іншого здійснюється безперервно, поступово. Кожному кольору 
            співставляється не якась одна довжина хвилі світла, а довжини хвиль, що потрапляють в деякий інтервал значень.</p>
          <h3 id="sixth-header">RGB</h3>
          
          <div style={{display: 'flex',flexDirection: 'row'}}>
              <video controls="controls" height = {230} style={{ paddingRight: "25px"}}>
                <source src="https://d3c33hcgiwev3.cloudfront.net/z783NkfoEeirCxICdYDggg.processed/full/360p/index.webm?Expires=1668470400&Signature=lE8Tr9bpXmym7Wb1hVPHdDRLcVEYU1WeULv13uqG3GT7KTJx-B~eGwCLguDk-7qyr~L6F3ohHcWZ7f4YfdCBoCK4uyc3w-ojLg2kLmPwrs7Mvj8VOAAHo7nyFc2Ad3Vdl-5rZbhZrEz9qYGFN~NzFkrEfnYtnLkl0VLGv3dNrEQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" type="video/mp4"/>
              </video>  
              <p style ={{marginTop: '0px ', marginBottom: '0px'}}>
                RGB (скорочено від англ. Red, Green, Blue — червоний, зелений, синій) — адитивна колірна модель, що описує 
                спосіб синтезу кольору, за якою червоне, зелене та синє світло накладаються разом, змішуючись у різноманітні 
                кольори. Широко застосовується в техніці, що відтворює зображення за допомогою випромінення світла.
                У даній моделі колір кодується градаціями складових каналів (Red, Green, Blue). Тому за збільшення величини 
                градації котрогось каналу — зростає його інтенсивність під час синтезу. Кількість градацій кожного каналу 
                залежить від розрядності бітового значення RGB. </p>
            </div>
            <p style={{marginTop: '0px '}}> Зазвичай використовують 24-бітну модель, у котрій визначається 
                по 8 біт на кожен канал, і тому кількість градацій дорівнює 256, що дозволяє закодувати 2563 = 16 777 216 
                кольорів. Колірна модель RGB призначена сприймати, представляти та відображати зображення в електронних 
                системах, таких як телебачення та комп'ютери, хоча її також застосовували у традиційній фотографії. Вже до 
                електронного віку, модель RGB мала за собою серйозну теорію, засновану на сприйнятті кольорів людиною.
            </p>
          <h3 id="seventh-header">HSV</h3>
          <div style={{display: 'flex',flexDirection: 'row'}}>
              <p style ={{marginTop: '0px ', marginBottom: '0px'}}>
                HSV (також HSB) — колірна модель, заснована на трьох характеристиках кольору: колірному тоні (Hue), 
                насиченості (Saturation) і значенні кольору (Value), який також називають яскравістю (Brightness).
                Hue — колірний тон, (наприклад, червоний, зелений або синьо-блакитний). Варіюється в межах 0-360°, але 
                іноді приводиться до діапазону 0-100 або 0-1. У Windows весь колірний спектр ділиться на 240 відтінків 
                (що можна спостерігати в редакторі палітри MS Paint), тобто тут «Hue» зводиться до діапазону 0-239 (відтінок 
                240 відсутній, оскільки він дублював би 0). Saturation — насиченість. Варіюється в межах 0-100 або 0-1. Чим </p>
              <video controls="controls" height = {230} style={{ paddingLeft: "20px"}}>
                <source src="https://d3c33hcgiwev3.cloudfront.net/yja0XYXzEeiEShL6YrwsWg.processed/full/360p/index.webm?Expires=1668470400&Signature=kvlmgz9mgMcbAXylTJs~bEKFyPmGm8clSUROwxjshQ8DfVbB~6FodTGpr1JmHAUssnY3NWNVrlySnsHQFh4VwPqXBuNGoIIiLXTEz13C245esfwUHnEIY-WInHKRkHC31Un-zqd8FHxPoRJaftJLnEIdODnBDapQuyD7rP4gkDc_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" type="video/mp4"/>
              </video>
            </div>
            <p style={{marginTop: '0px '}}> 
            більший цей параметр, тим «чистіший» колір, тому цей параметр іноді називають чистотою кольору. А 
            чим ближчий цей параметр до нуля, тим ближчий колір до нейтрального сірого.Value — значення кольору, або Brightness
             — яскравість. Також задається в межах 0-100 або 0-1.
            </p>
            <p>Модель була створена Елві Реєм Смітом, одним із засновників Pixar, в 1978 році. Вона є нелінійним 
              перетворенням моделі RGB. Колір, представлений в HSV, залежить від пристрою, на який він буде виведений, 
              оскільки HSV — перетворення моделі RGB, яка теж залежить від пристрою. Для отримання коду кольору, не 
              залежного від пристрою, використовується модель Lab.
              </p>
          <h2 id="eighth-header">Афінне перетворення</h2>
          <p>Афінне перетворення (лат. affinis, «пов'язаний з») — відображення площини або простору в собі, при якому 
            паралельні прямі переходять у паралельні прямі, пересічні — в пересічні, мимобіжні — в мимобіжні. Інакше кажучи, 
            відображення називається афінним, якщо його можна отримати таким способом:
            </p>
          <p style={{marginLeft: '15px '}}>1. Обрати «новий» базис простору з «новим» початком координат v;
          </p>
          <p style={{marginLeft: '15px '}}>2. Координатам x кожної точки простору поставити у відповідність нові координати f (x), 
          які мають те саме положення в просторі відносно «нової» системи координат, яке координати x мали в «старій».
          </p>
          <p>Зазвичай лінійна алгебра використовує матриці для представлення лінійних перетворень, і векторну суму для 
            представлення паралельних перенесень. За допомогою розширеної матриці можливо представити і те, і те як матричний 
            добуток. Ця техніка вимагає розширити всі вектори додаванням «1» в кінці, всі матриці розширюються додаванням рядка 
            нулів знизу, і колонки — вектора переноса — справа, а також одиниці в нижній правий кут. 
          </p>
          <h3 id="nineth-header">Представлення</h3>
          <div style={{display: 'flex',flexDirection: 'row'}}>
              <video controls="controls" height = {230} style={{ paddingRight: "25px"}}>
                  <source src="https://d3c33hcgiwev3.cloudfront.net/aZc5SfKmEea1sQ78iutjUA.processed/full/360p/index.webm?Expires=1668470400&Signature=ABKnKnGPbeddH2DmUgBr6krw-gPC9lAy8PNmknvfzifyx2XSEywv0M9kdzFlLlhonFOkYUSICMg48npsVRVnyxUD9BH4bHlg90pOjDER4o5nQFrTtD2AldDOomHtPiDiD3ctgHNXqRjLi93RxWUsqcYga18ZFxco5pGJ5Utlqek_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" type="video/mp4"/>
              </video>
                <ul style ={{marginTop: '0px ', marginBottom: '0px'}}>
                  <li style = {{listStyleType: 'initial'}}>
                    При афінному перетворені пряма переходить в пряму.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                    Якщо розмірність простору <i>n &#8805; 2</i>, то будь-яке перетворення простору (тобто бієкція простору на себе), 
                    яке переводить прямі в прямі, є афінним. Це визначення використовується в аксіоматичній побудові афінної геометрії.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                    Окремим випадком афінних перетворень є ізометрії та перетворення подібності.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                    Афінні перетворення утворюють групу відносно композиції.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                    Окремим випадком перспективної колінеації є перспективно-афінна відповідність плоских полей, встановлена 
                    паралельним проектуванням. 
                  </li>
                </ul>
            </div>
            <p style={{marginTop: '0px '}}> Ці властивості паралельного проектування дозволяють встановити ті співвідношення між 
                    окремими елементами предмету, які відображаються при кресленні, тобто є інваріантами перетворення паралельним 
                    проектуванням.
            </p>
          <h3 id="tenth-header">Типи</h3>
          <div style={{display: 'flex',flexDirection: 'row'}}>
              <ul style ={{marginTop: '0px ', marginBottom: '0px'}}>
                  <li style = {{listStyleType: 'initial'}}>
                  Вільноафінне перетворення — афінне перетворення, що не має інваріантних точок.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                  Еквіафінне перетворення — афінне перетворення, що зберігає площу.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                  Перспективноафінне перетворення — афінне перетворення, що має принаймні дві інваріантні точки.
                  </li>
                  <li style = {{listStyleType: 'initial'}}>
                  Центроафінне перетворення — афінне перетворення, що зберігає початок координат.
                  </li>
                </ul>
              <video controls="controls" height = {230} style={{ paddingLeft: "20px"}}>
                <source src="https://d3c33hcgiwev3.cloudfront.net/znHPMclcEemkWQq0Oc-iqg.processed/full/360p/index.webm?Expires=1668470400&Signature=haXRpmFvrWLBdnp0tFAxOAZrMAot0znt7hA3V7ttyBI88uw6mc2VevPy72iBpzTai9UAtAECj3ayzLpVLyeYDvcoNGxaG-D5lpULsyY6ohsGSn1654BqhnxGLSiYslGVm4kF75L-E8ZP6ueqb6x6eLPLUZGieTDL9JLMa7wXhiw_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" type="video/mp4"/>
              </video>
            </div>
            <p style={{marginTop: '10px '}}> 
            За допомогою однорідних координат і матриць третього порядку можна описати довільне афінне перетворення.
            Зазвичай матрично-векторний добуток завжди відображає початок координат на початок координат, і, таким чином,
             не може представляти перенесення, яке обов'язково переносить початок координат в іншу точку. Додаванням «1» 
             до кожного вектора, вважаємо простір відображенним на підмножину простору з одним додатковим виміром. В цьому 
             просторі, початковий простір займає підмножину в якій останній індекс 1. Таким чином початок координат початкового
             простору буде знаходитися в (0,0, … 0, 1). Перенесення всередині початкового простору в термінах лінійного 
             перетворення простору з більшою кількістю вимірів стає можливим. Це є приклад однорідних координат.
            Перевагою використання однорідних координат є те, що можливо комбінувати будь-яку кількість перетворень в одне 
            шляхом перемноження матриць. Ця можливість використовується графічними програмами.
            </p>
        </div>
        <TableOfContents />
        <div className = "image-widget"> 
          <img src ={imgPathTop} style={{width: '230px', height: '166px'}}/>
          <img src ={imgPathBottom} style={{width: '230px', height: '166px'}}/>
        </div>
      </div>
      </>
    );
  };
  