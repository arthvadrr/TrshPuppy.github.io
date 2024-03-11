import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useLocation } from 'react-router-dom';

const Blog = () => {
    const markdownFilesGlob = import.meta.glob('/public/md/*.md');
    const markdownFilePaths = Object.keys(markdownFilesGlob);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const fileParam = params.get('file');
    const [currentFilePath, setCurrentFilePath] = useState( markdownFilePaths[0] || '');
    const [currentFile, setCurrentFile] = useState('');

    const handleMDLinkClick = path => {
        setCurrentFilePath(path);
    }

    const fetchCurrentFileText = async () => {
        try {
            const publicPath = formatPublicPath(currentFilePath);
            let res = await fetch(publicPath);
            res = await res.text();
            setCurrentFile(res);
        } catch (err) {
            console.log(err);
        }
    }

    const formatPathToTitle = path => {
        let result = path;
        result = result.replace('/public/md', '');
        result = result.replace('.md', '');
        result = result.replace(/[^\w\s]/gi, ' ');
        result = result.replace(/\b\w/g, match => match.toUpperCase());
        return result.trim();
    }

    const formatTitleToSlug = title => {
        return title
           .toLowerCase()
           .replace(/[^a-z0-9\s-]/g, '')
           .replace(/\s+/g, '-')
           .replace(/-+/g, '-')
           .trim();
    };


    const formatPublicPath = path => path.replace('/public', '');

    useEffect(() => {
        void fetchCurrentFileText();
    }, [currentFilePath]);

    useEffect(() => {
        if (fileParam) {
            for (const path of markdownFilePaths) {
                if (formatTitleToSlug(formatPathToTitle(path)) === fileParam) {
                    setCurrentFilePath(path);
                }
            }
        } else {
            void fetchCurrentFileText();
        }
    }, []);

    return (
       <div id="about-view" className="view">
           <aside>
               <nav>
                   <ul>
                       {markdownFilePaths.map((path, i) => {
                           const title = formatPathToTitle(path);
                           const slug = formatTitleToSlug(title);

                           return (
                              <li key={`aside-file-${i}`}>
                                  <Link to={`?file=${slug}`} onClick={() => handleMDLinkClick(path)}>{title}</Link>
                              </li>
                           );
                       })}
                   </ul>
               </nav>
           </aside>
           <article>
               <ReactMarkdown>{currentFile}</ReactMarkdown>
           </article>
       </div>
    );
};

export default Blog;
