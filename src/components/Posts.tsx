import Post from "./Post.tsx";
import Category from "./Category.tsx";
import Filters from "./Filters.tsx";
import {useState} from "react";
import {post} from "../util/types.ts";

const Posts = () => {


    const [posts ,setPosts] = useState<post[]>([]);



    return (
        <section className="py-6 sm:py-3 p-3 dark:bg-white dark:text-gray-800">
            <div className="container  mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <Category/>
                </div>
                <section className={"flex gap-4 sm:flex-row flex-col"}>
                    <Filters setPosts={setPosts}/>
                    <div className="flex-1 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((el:post,index) => {
                            return <Post key={index} data={el} />
                        })}
                    </div>


                </section>


            </div>
            <div className={"w-full flex justify-center mt-7 mb-4"}>
                {/*<Button>Load more</Button>*/}
            </div>
        </section>
    );
};

export default Posts;