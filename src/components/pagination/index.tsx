import './pagination.css'

function Pagination({ handleLoadMore, handleLoadPage, currentPage, previousUrl, nextUrl }) {
  return (
            <div className="pagination-buttons">
                {previousUrl && <button className="pagination-button" id='pagination-previous' onClick={() => handleLoadMore(previousUrl, -1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
                </button>}
                {Array.from({ length: 5 }).map((_, i) => {
                const page = currentPage - 2 + i;
                return page > 0 && (
                    <button
                    key={page}
                    className="pagination-button"
                    id='pagination-number'
                    onClick={() => handleLoadPage(page)}
                    style={{ 
                        fontWeight: currentPage === page ? 'bold' : 'normal',
                        color: currentPage === page ? '#3A463E' : '#F9F7F9',
                        backgroundColor: currentPage === page ? '#98D2CE' : '#698880',
                    }}
                    >
                    {page}
                    </button>
                );
                })}
                {nextUrl && <button className="pagination-button" id='pagination-next' onClick={() => handleLoadMore(nextUrl, 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
                </button>}
            </div>
    );
}

export default Pagination;