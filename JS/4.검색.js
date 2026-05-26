document.addEventListener('DOMContentLoaded', function() {
    performSearch();
});

function performSearch() {
    // 📌 보내주신 CSS의 ID인 'game-search-input'으로 매칭 완료
    const query = document.getElementById('game-search-input').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    const countContainer = document.getElementById('results-count');
    
    if (!resultsContainer) return;

    // '게임데이터.js'의 games 배열을 참조 (없을 시 비상용 임시 배열 작동)
    const gameList = (typeof games !== 'undefined') ? games : [
        { id: 'game1', title: '게임1', genre: '로그라이크, 액션', price: '₩ 51,000', img: '../img/alpaca_thumb.png' },
        { id: 'game2', title: '게임2', genre: '로그라이크, 전략', price: '₩ 43,000', img: '../img/alpaca_thumb.png' },
        { id: 'game3', title: '게임3', genre: '전략, RPG', price: '₩ 32,000', img: '../img/alpaca_thumb.png' },
        { id: 'game4', title: '게임4', genre: '액션, RPG', price: '₩ 21,000', img: '../img/alpaca_thumb.png' },
        { id: 'game5', title: '게임5', genre: '액션, 시뮬레이션', price: '₩ 15,000', img: '../img/action_thumb.png' },
        { id: 'game6', title: '게임6', genre: '어드벤처, 시뮬레이션', price: '₩ 65,000', img: '../img/action_thumb.png' },
        { id: 'game7', title: '게임7', genre: '시뮬레이션, RPG', price: '₩ 39,000', img: '../img/action_thumb.png' }
    ];

    // 검색어가 없으면 안내 문구를 띄우고 결과창을 비웁니다.
    if (query === '') {
        if (countContainer) countContainer.innerText = "검색어를 입력해주세요.";
        resultsContainer.innerHTML = '';
        return;
    }

    // 제목에 검색어가 포함되어 있는지 필터링
    const filteredGames = gameList.filter(game => {
        return game.title.toLowerCase().includes(query);
    });

    // 기존 결과 목록 비우기
    resultsContainer.innerHTML = '';

    // 검색 결과 개수 표시 업데이트 (.search-results-info 스타일 적용)
    if (countContainer) {
        countContainer.innerText = `총 ${filteredGames.length}개의 게임이 검색되었습니다.`;
    }

    // 결과가 없을 때
    if (filteredGames.length === 0) {
        resultsContainer.innerHTML = '<p style="color: #aaa; text-align: center; padding: 40px 0;">검색 결과와 일치하는 게임이 없습니다.</p>';
        return;
    }

    // 카테고리 CSS 디자인과 결합하여 세로 카드 리스트 동적 생성
    filteredGames.forEach(game => {
        const cardHTML = `
            <div class="mini-card" onclick="location.href='./게임상세.html?id=${game.id}'" style="cursor: pointer;">
                <div class="card-img">
                    <img src="${game.img || '../img/alpaca_thumb.png'}" alt="${game.id}">
                </div>
                <div class="card-info">
                    <div class="game-title">${game.title}</div>
                    <div class="game-genre">${game.genre}</div>
                </div>
                <div class="card-price-area">
                    <button class="wish-add-btn" onclick="addToWishlist('${game.id}', '${game.title}', event)">즐겨찾기</button>
                    <div class="price-box">
                        <span class="final-price">${game.price}</span>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += cardHTML;
    });
}

// 즐겨찾기 추가 함수
function addToWishlist(gameId, gameTitle, event) {
    if (event) event.stopPropagation(); // 카드 클릭 상세 이동 방지

    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    
    if (wishlist.includes(gameId)) {
        alert('이미 즐겨찾기에 추가된 게임입니다.');
        return;
    }
    
    wishlist.push(gameId);
    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    alert(`${gameTitle}이(가) 즐겨찾기에 추가되었습니다!`);
}