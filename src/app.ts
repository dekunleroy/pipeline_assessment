type ResultData = {
  id: string;
  gender: string;
  age: number;
  row: number;
};

type PagingData = {
  next?: string;
  previous?: string;
};

let previousBtn: HTMLElement | any = document.querySelector(
"button[data-prevbtn]"
);
let nextBtn: HTMLElement | any = document.querySelector(
"button[data-nextbtn]"
);
let pageView: HTMLElement | any = document.querySelector(
"label[data-pageview]"
);
let currentPage: number = 1;

const paginate = () => {
  previousBtn.addEventListener("click", async () => {
    if (currentPage === 1) {
      return currentPage;
    } else {
      currentPage--;
    }
    await loadData(currentPage);
  });
  nextBtn.addEventListener("click", async () => {
    currentPage++;
    await loadData(currentPage);
  });
};

const loadData = async (page: number = 1) => {
  const response = await fetch(
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`
  );

  if (response.status === 200) {
    const resData = await response.json();
    const paging: PagingData = resData?.results[0].paging;
    const data: ResultData[] = resData?.results[0][`${currentPage}`];
    const pageNo = resData?.info.page;
    pageView.innerHTML = `Page: ${pageNo}`;
    if (paging.previous) {
      previousBtn.disabled = false;
      previousBtn.style.color = "#fff";
      previousBtn.style.backgroundColor = "#04AA6D";
    } else {
      previousBtn.disabled = true;
      previousBtn.style.color = "black";
      previousBtn.style.backgroundColor = "gray";
    }
    console.log('resData', resData)
    for (const n in data) {
      const index = Number(n) + 1;
      const item = data[n];
      const tR = document.querySelector(`tbody > tr:nth-child(${index})`);
      tR?.setAttribute("data-entryid", item.id);
      const firstChild = document.querySelector(
        `tbody > tr:nth-child(${index}) > td:nth-child(1)`
      );
      const secondChild = document.querySelector(
        `tbody > tr:nth-child(${index}) > td:nth-child(2)`
      );
      const thirdChild = document.querySelector(
        `tbody > tr:nth-child(${index}) > td:nth-child(3)`
      );
      firstChild.innerHTML = item.row;
      secondChild.innerHTML = item.gender;
      thirdChild.innerHTML = item.age;

    }
  }
};

const startApp = async () => {
  await loadData();
  paginate();
};

document.addEventListener('DOMContentLoaded', startApp);
