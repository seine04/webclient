function filterGames(genre, event) {
    // 연결 확인을 위한 로그 (브라우저 콘솔 F12에서 확인 가능)
    console.log("선택된 장르:", genre);

    const cards = document.querySelectorAll('.mini-card');
    const buttons = document.querySelectorAll('.category-item');

    // 1. 버튼 활성화 스타일 제어
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event) {
        event.currentTarget.classList.add('active');
    }

    // 2. 필터링 로직
    cards.forEach(card => {
        const cardGenre = card.getAttribute('data-genre');
        if (cardGenre && cardGenre.includes(genre)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function addToWishlist(gameId, gameTitle, event) {
    // 1. 하트를 클릭했을 때 카드 전체가 클릭되어 상세페이지로 넘어가는 것을 방지
    if (event) {
        event.stopPropagation(); 
    }

    // 2. 브라우저 로컬 스토리지에서 기존 즐겨찾기 목록 가져오기 (없으면 빈 배열)
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];

    // 3. 이미 즐겨찾기에 추가된 게임인지 확인
    if (wishlist.includes(gameId)) {
        alert("이미 즐겨찾기에 등록된 게임입니다.");
    } else {
        // 4. 목록에 게임 ID 추가하고 저장하기
        wishlist.push(gameId);
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        alert(`${gameTitle}이(가) 즐겨찾기에 추가되었습니다!`);
    }
}