// [1] 페이지가 완전히 로드되면 게임 데이터 화면에 뿌리기
document.addEventListener('DOMContentLoaded', function() {
    loadGameDetails();
});

// [2] 주소창에서 gameId를 안전하게 가져오는 함수 (공용)
function getGameId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 'game1';
}

// [3] 게임 상세 정보 로드 함수
function loadGameDetails() {
    const gameId = getGameId(); // 호출되는 순간 안전하게 id를 가져옴
    const currentGame = gameDatabase[gameId];

    if (!currentGame) {
        alert("게임 정보를 찾을 수 없습니다.");
        return;
    }

    // 상단 기본 정보 화면에 집어넣기
    document.getElementById('detail-title').innerText = currentGame.title;
    document.getElementById('detail-desc').innerText = currentGame.desc;
    document.getElementById('detail-release').innerText = currentGame.release;
    document.getElementById('detail-developer').innerText = currentGame.developer;
    document.getElementById('detail-tags').innerText = currentGame.tags;
    document.getElementById('detail-price').innerText = currentGame.price;
    
    const imgElement = document.getElementById('detail-img');
    if (imgElement) imgElement.src = currentGame.img;

    // 시스템 요구 사항 데이터 불러오기
    const minList = document.getElementById('min-req-list');
    const reqList = document.getElementById('req-req-list');

    if (minList && reqList && currentGame.requirements) {
        const reqs = currentGame.requirements;
        minList.innerHTML = `
            <li><strong>운영체제:</strong> ${reqs.minimum.os}</li>
            <li><strong>프로세서:</strong> ${reqs.minimum.cpu}</li>
            <li><strong>메모리:</strong> ${reqs.minimum.memory}</li>
            <li><strong>그래픽:</strong> ${reqs.minimum.graphics}</li>
            <li><strong>저장공간:</strong> ${reqs.minimum.storage}</li>
        `;
        reqList.innerHTML = `
            <li><strong>운영체제:</strong> ${reqs.recommended.os}</li>
            <li><strong>프로세서:</strong> ${reqs.recommended.cpu}</li>
            <li><strong>메모리:</strong> ${reqs.recommended.memory}</li>
            <li><strong>그래픽:</strong> ${reqs.recommended.graphics}</li>
            <li><strong>저장공간:</strong> ${reqs.recommended.storage}</li>
        `;
    } else {
        if (minList) minList.innerHTML = "<li>사양 정보가 없습니다.</li>";
        if (reqList) reqList.innerHTML = "<li>사양 정보가 없습니다.</li>";
    }

    // 화면 로드가 끝나면 하단 즐겨찾기 버튼 상태 확인하기
    checkWishlistStatus();
}

// [4] ★ 즐겨찾기 토글 함수 (HTML의 onclick="toggleWishlist()"와 직접 연결됨)
function toggleWishlist() {
    const gameId = getGameId(); // 호출되는 순간 안전하게 id를 가져옴
    const currentGame = gameDatabase[gameId];
    if (!currentGame) return;

    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    
    if (wishlist.includes(gameId)) {
        // 이미 즐겨찾기에 있다면 제거
        wishlist = wishlist.filter(id => id !== gameId);
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        alert(`${currentGame.title}이(가) 즐겨찾기에서 제거되었습니다.`);
    } else {
        // 없다면 즐겨찾기에 새로 추가
        wishlist.push(gameId);
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        alert(`${currentGame.title}이(가) 즐겨찾기에 추가되었습니다!`);
    }
    
    // 로컬스토리지 데이터가 바뀌었으므로 버튼 글자 상태 실시간 새로고침
    checkWishlistStatus();
}

function checkWishlistStatus() {
    const wishBtn = document.getElementById('wish-trigger');
    if (!wishBtn) return; // 버튼 요소를 찾을 수 없으면 에러 방지를 위해 즉시 종료
    
    const gameId = getGameId(); // 호출되는 순간 안전하게 id를 가져옴
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    
    // 리스트에 현재 gameId가 포함되어 있는지 확인
    if (wishlist.includes(gameId)) {
        wishBtn.innerText = "즐겨찾기 해제";
        wishBtn.classList.add('active'); 
    } else {
        wishBtn.innerText = "즐겨찾기 추가";
        wishBtn.classList.remove('active');
    }
}