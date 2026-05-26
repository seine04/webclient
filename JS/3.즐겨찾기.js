// 페이지가 완전히 로드되면 즐겨찾기 목록을 화면에 그립니다.
document.addEventListener('DOMContentLoaded', function() {
    displayWishlist();
});

function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist-list');
    if (!wishlistContainer) return;

    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p style="color: #aaa; text-align: center; padding: 40px 0;">즐겨찾기에 추가된 게임이 없습니다.</p>';
        return;
    }

    wishlistContainer.innerHTML = '';

    wishlist.forEach(function(gameId) {
        let gameTitle = "게임 정보";
        let gameGenre = "장르 정보";
        let gamePrice = "₩ 0";
        let imgSrc = "../img/alpaca_thumb.png";

        if (gameId === 'game1') { gameTitle = "게임1"; gameGenre = "로그라이크, 액션"; gamePrice = "₩ 51,000"; }
        else if (gameId === 'game2') { gameTitle = "게임2"; gameGenre = "로그라이크, 전략"; gamePrice = "₩ 43,000"; }
        else if (gameId === 'game3') { gameTitle = "게임3"; gameGenre = "전략, RPG"; gamePrice = "₩ 32,000"; }
        else if (gameId === 'game4') { gameTitle = "게임4"; gameGenre = "액션, RPG"; gamePrice = "₩ 21,000"; }
        else if (gameId === 'game5') { gameTitle = "게임5"; gameGenre = "액션, 시뮬레이션"; gamePrice = "₩ 15,000"; imgSrc = "../img/action_thumb.png"; }
        else if (gameId === 'game6') { gameTitle = "게임6"; gameGenre = "어드벤처, 시뮬레이션"; gamePrice = "₩ 65,000"; imgSrc = "../img/action_thumb.png"; }
        else if (gameId === 'game7') { gameTitle = "게임7"; gameGenre = "시뮬레이션, RPG"; gamePrice = "₩ 39,000"; imgSrc = "../img/action_thumb.png"; }

        // 📌 카테고리 페이지와 100% 똑같은 클래스 구조를 사용합니다.
        // 버튼 색상만 구분을 위해 빨간색(기본 인라인 스타일)을 주었습니다.
        const cardHTML = `
            <div class="mini-card" onclick="location.href='./게임상세.html?id=${gameId}'" style="cursor: pointer;">
                <div class="card-img"><img src="${imgSrc}" alt="${gameId}"></div>
                <div class="card-info">
                    <div class="game-title">${gameTitle}</div>
                    <div class="game-genre">${gameGenre}</div>
                </div>
                <div class="card-price-area">
                    <button class="wish-add-btn" style="background-color: #a32a2a !important;" onclick="removeFromWishlist('${gameId}', event)">제거</button>
                    <div class="price-box"><span class="final-price">${gamePrice}</span></div>
                </div>
            </div>
        `;
        
        wishlistContainer.innerHTML += cardHTML;
    });
}

function removeFromWishlist(gameId, event) {
    if (event) event.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    wishlist = wishlist.filter(id => id !== gameId);
    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    displayWishlist();
    alert('즐겨찾기에서 삭제되었습니다.');
}