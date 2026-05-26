// 샘플 더미 데이터 (처음 아무것도 없을 때 보여줄 기본 글)
const defaultPosts = [
    { num: 1, title: "인디 게임 추천 카테고리 업데이트", author: "관리자", date: "2026-05-24" }
];

document.addEventListener('DOMContentLoaded', () => {
    initBoard();
});

function initBoard() {
    let posts = JSON.parse(localStorage.getItem('communityPosts'));
    if (!posts) {
        posts = defaultPosts;
        localStorage.setItem('communityPosts', JSON.stringify(posts));
    }
    renderPosts(posts);
}

function renderPosts(posts) {
    const tbody = document.getElementById('board-content');
    tbody.innerHTML = '';

    if (posts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#556772; padding:30px;">등록된 게시글이 없습니다.</td></tr>';
        return;
    }

    posts.forEach(post => {
        const trHtml = `
            <tr>
                <td class="td-num">${post.num}</td>
                <td class="td-title">
                    ${post.title}
                    <button class="post-delete-btn" onclick="deletePost(${post.num}, event)">X</button>
                </td>
                <td>${post.author}</td>
                <td class="td-date">${post.date}</td>
            </tr>
        `;
        tbody.innerHTML += trHtml;
    });
}

// 게시글 삭제 함수 추가
function deletePost(postNum, event) {
    // 부모 요소(tr)로 클릭 이벤트가 전파되어 글이 열리는 등의 오작동 방지
    event.stopPropagation();

    if (confirm("이 게시글을 삭제하시겠습니까?")) {
        let posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
        
        // 해당 번호의 글만 제외하고 새로운 배열 만들기
        posts = posts.filter(post => post.num !== postNum);
        
        // 로컬 스토리지에 저장 후 화면 갱신
        localStorage.setItem('communityPosts', JSON.stringify(posts));
        renderPosts(posts);
    }
}

// 모달 제어
function openModal() { document.getElementById('write-modal').classList.remove('hidden'); }
function closeModal() { document.getElementById('write-modal').classList.add('hidden'); }

// 글 등록
function submitPost() {
    const title = document.getElementById('post-title').value.trim();
    const author = document.getElementById('post-author').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (!title || !author) {
        alert("제목과 작성자를 입력해주세요!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    
    // 새 글 번호 지정 (현재 글 개수 + 1)
    const newNum = posts.length > 0 ? Math.max(...posts.map(p => p.num)) + 1 : 1;
    
    // 오늘 날짜 구하기 (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    const newPost = { num: newNum, title: title, author: author, date: today };
    
    // 최신 글이 맨 위로 오도록 배열 앞에 추가
    posts.unshift(newPost);
    localStorage.setItem('communityPosts', JSON.stringify(posts));

    // 화면 갱신 및 초기화
    renderPosts(posts);
    closeModal();
    
    document.getElementById('post-title').value = '';
    document.getElementById('post-author').value = '';
    document.getElementById('post-content').value = '';
}