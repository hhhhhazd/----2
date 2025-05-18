// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const contactForm = document.getElementById('contactForm');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // 网站内容数据（用于搜索功能）
    const websiteContent = [
        {
            title: '首页',
            content: '欢迎来到我的网站，您可以在这里了解我的信息和作品。',
            url: '#home'
        },
        {
            title: '关于我',
            content: '您好！我是[您的名字]，一位[您的职业/身份]。我擅长[您的技能]，对[您的兴趣爱好]充满热情。我的目标是[您的目标]。',
            url: '#about'
        },
        {
            title: '项目1',
            content: '这是我的第一个项目描述。',
            url: '#portfolio'
        },
        {
            title: '项目2',
            content: '这是我的第二个项目描述。',
            url: '#portfolio'
        },
        {
            title: '项目3',
            content: '这是我的第三个项目描述。',
            url: '#portfolio'
        },
        {
            title: '联系方式',
            content: '邮箱：your.email@example.com 电话：+86 123 4567 8910 地址：中国某省某市某区',
            url: '#contact'
        }
    ];
    
    // 搜索功能
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        // 如果搜索词为空，隐藏结果区域
        if (query === '') {
            searchResults.style.display = 'none';
            return;
        }
        
        // 过滤匹配的内容
        const results = websiteContent.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.content.toLowerCase().includes(query);
        });
        
        // 显示搜索结果
        displayResults(results, query);
    }
    
    // 显示搜索结果
    function displayResults(results, query) {
        // 清空之前的结果
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p>没有找到匹配的结果</p>';
            searchResults.style.display = 'block';
            return;
        }
        
        // 为每个结果创建HTML元素
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            // 高亮显示匹配的文本
            const highlightedTitle = highlightText(result.title, query);
            const highlightedContent = highlightText(result.content, query);
            
            resultItem.innerHTML = `
                <a href="${result.url}">${highlightedTitle}</a>
                <p>${highlightedContent}</p>
            `;
            
            searchResults.appendChild(resultItem);
        });
        
        // 显示结果区域
        searchResults.style.display = 'block';
    }
    
    // 高亮显示匹配的文本
    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    // 点击搜索按钮时执行搜索
    searchButton.addEventListener('click', performSearch);
    
    // 按下回车键时执行搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 点击页面其他区域时隐藏搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && 
            !searchButton.contains(e.target) && 
            !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // 联系表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 在实际应用中，这里应该发送数据到服务器
            // 这里只是简单地显示一个提交成功的消息
            alert(`感谢您的留言，${name}！\n我们会尽快回复您。`);
            
            // 重置表单
            contactForm.reset();
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // 更新URL但不刷新页面
                history.pushState(null, null, targetId);
            }
        });
    });
});