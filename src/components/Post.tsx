



// @ts-ignore
const Post= ({data}) => {

    return (
        <article className="flex flex-col dark:bg-gray-50">
            <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                <img alt="" className="object-fit w-full h-52 dark:bg-gray-500"
                     src={data.imageUrls[0]}/>
            </a>
            <div className="flex flex-col flex-1 p-6">
                <a rel="noopener noreferrer" href="#"
                   aria-label="Te nulla oportere reprimique his dolorum">{data.location}</a>
                <a rel="noopener noreferrer" href="#"
                   className="text-xs tracking-wider uppercase hover:underline dark:text-violet-600">{data.category}</a>
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">{data.title}</h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                    <span>{new Date(data.createdDate).toLocaleDateString()}</span>
                    <span className={"text-lg"}>{data.cost}$</span>
                </div>
            </div>
        </article>
    );
};

export default Post;