import axios from "axios";
import { configDotenv } from 'dotenv';

configDotenv();

class ArticleController {
    // Get articles related to mental health
    static async getArticle(req, res) {
        // const apiKey = process.env.NEWS_API_KEY;
        // try {
        //     const response = await axios.get(
        //         `https://newsapi.org/v2/everything?q=mental+health+tips&pageSize=15&apiKey=${apiKey}`
        //     );
        //     const articles = response.data.articles.map(article => ({
        //         title: article.title,
        //         url: article.url,
        //         urlToImage: article.urlToImage,
        //     }));
        //     res.json(articles);
        // } catch (error) {
        //     res.status(500).send('Error fetching articles');
        // }
        const articles = [
            {
              title: '17 Mental Health Tips That People Absolutely Swear By',
              url: 'https://www.buzzfeed.com/caseyrackham/people-sharing-things-that-helped-mental-health',
              urlToImage: 'https://img.buzzfeed.com/buzzfeed-static/static/2024-06/19/17/enhanced/72abe00b6269/original-3800-1718819996-9.jpg?crop=1246:652;3,0%26downsize=1250:*'
            },
            {
              title: 'The Internet Can Be as Good for Your Mental Health as a Walk in Nature, Says New Study - CNET',
              url: 'https://www.cnet.com/home/internet/the-internet-can-be-as-good-for-your-mental-health-as-a-walk-in-nature-says-new-study/',
              urlToImage: 'https://www.cnet.com/a/img/resize/3bed664322d95dd3d0d38c398f0d2f73bd36ed8a/hub/2024/06/10/0c8932a3-baca-47e1-be0a-d1ebdb2cbac9/gettyimages-1438423587.jpg?auto=webp&fit=crop&height=675&width=1200'
            },
            {
              title: 'A nutrition expert and chef shares 7 foods for a healthy brain and gut that are always on her grocery list',
              url: 'https://www.businessinsider.com/nutritional-psychiatrist-shares-foods-she-buys-for-healthy-brain-2024-6',
              urlToImage: 'https://i.insider.com/666b26ede07904901818cc5f?width=1200&format=jpeg'
            },
            {
              title: 'Forgot where you put the keys? Experts (and a trivia buff) share tips to boost memory',
              url: 'https://www.npr.org/2024/06/25/g-s1-5912/techniques-to-improve-memory',
              urlToImage: 'https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5994x3372+0+312/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F73%2F2c%2F3c579c604e639bf083a6c57b8088%2Fgettyimages-1447700717-slide.jpg'
            },
            {
              title: 'What Happens to Your Body When You Take Ashwagandha Regularly',
              url: 'https://www.eatingwell.com/ashwagandha-benefits-8668370',
              urlToImage: 'https://s.yimg.com/ny/api/res/1.2/QWnAlXVvR6Sm7WRo8QRUFg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/eating_well_articles_946/f74ff6fcfe5f526b27c5f55d5f1ccdc5'
            },
            {
              title: 'Adults Are Losing Their Shit About Teen Mental Health On Social Media, While Desperate Teens Are Using AI For Mental Help',
              url: 'https://www.techdirt.com/2024/06/28/adults-are-losing-their-shit-about-teen-mental-health-on-social-media-while-desperate-teens-are-using-ai-for-mental-help/',        
              urlToImage: 'https://www.techdirt.com/wp-content/themes/techdirt/assets/images/td-rect-logo-white.png'
            },
            {
              title: 'Dozing or Deep? How Sleep Impacts Your Mental Health',
              url: 'https://www.psychologytoday.com/intl/blog/inside-intimacy/202407/dozing-or-deep-how-sleep-impacts-your-mental-health',
              urlToImage: 'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/teaser_image/blog_entry/2024-07/Untitled%20design%20%289%29.png.jpg?itok=BoQguFlU'
            },
            {
              title: 'How Cleaning Can Improve Your Mental Health',
              url: 'https://socialmediaexplorer.com/content-sections/tools-and-tips/how-cleaning-can-improve-your-mental-health/',
              urlToImage: 'https://socialmediaexplorer.com/wp-content/uploads/2024/07/How-Cleaning-Can-Improve-Your-Mental-Health.jpg'
            },
            {
              title: 'Via Generative AI You Can Freely Get A Sturdy Dose Of Emotional CPR Along With A Tad Of Mental Health First Aid',
              url: 'https://www.forbes.com/sites/lanceeliot/2024/06/16/via-generative-ai-you-can-freely-get-a-sturdy-dose-of-emotional-cpr-along-with-a-tad-of-mental-health-first-aid/',  
              urlToImage: 'https://imageio.forbes.com/specials-images/imageserve/6664ec6932ef0938bfda88ba/0x0.jpg?format=jpg&crop=3241,2160,x427,y0,safe&height=900&width=1600&fit=bounds' 
            },
            {
              title: 'Enhancing Your Wellness Journey: Optimizing Self-Care with Linux Gadgets',
              url: 'https://www.linuxjournal.com/content/enhancing-your-wellness-journey-optimizing-self-care-linux-gadgets',
              urlToImage: null
            },
            {
              title: 'Health & Wellness Brands: 5 Tips For Unlocking PR Magic',
              url: 'https://www.forbes.com/sites/forbesbusinesscouncil/2024/07/01/health--wellness-brands-5-tips-for-unlocking-pr-magic/',
              urlToImage: 'https://imageio.forbes.com/specials-images/imageserve/667f004676b74bcbda6c96a5/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds'
            },
            {
              title: 'Easing the Worry: Helping a Loved One With Illness Anxiety',
              url: 'https://www.psychologytoday.com/intl/blog/liking-the-child-you-love/202406/easing-the-worry-helping-a-loved-one-with-illness-anxiety',
              urlToImage: 'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/teaser_image/blog_entry/2024-06/martha-dominguez-de-gouveia-k-NnVZ-z26w-unsplash%20illness%20anxiety.jpg?itok=h8i_SBat'
            },
            {
              title: 'Sleep Chronotypes and Why Sleep is Vital for Your Health',
              url: 'https://socialmediaexplorer.com/content-sections/sleep-chronotypes-and-why-sleep-is-vital-for-your-health/',
              urlToImage: 'https://socialmediaexplorer.com/wp-content/uploads/2024/06/Sleep-Chronotypes-and-Why-Sleep-is-Vital-for-Your-Health.jpg'
            },
            {
              title: 'How To Become A Certified Holistic Health Coach',
              url: 'https://fitnessista.com/how-to-become-a-certified-holistic-health-coach/',
              urlToImage: 'https://fitnessista.com/wp-content/uploads//2024/06/on-my-laptop-747x1024.jpg'
            },
            {
              title: '5 Things To Keep Job Stress From Freaking You Out In Your Career',
              url: 'https://www.forbes.com/sites/bryanrobinson/2024/07/01/5-things-to-keep-job-stress-from-freaking-you-out-in-your-career/',
              urlToImage: 'https://imageio.forbes.com/specials-images/imageserve/66805a86c61673b27877abc2/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds'
            }
        ]
        res.json(articles)
    }

    // Search articles
    static async getArticleBySearch(req, res) {
        const  {search } = req.body;
        if (!search) return res.status(401).json({ error: 'Missing Search' });

        const words = search.split(' ');
        const joinedString = words.join('+');

        const apiKey = process.env.NEWS_API_KEY;
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/everything?q=${joinedString}&pageSize=15&apiKey=${apiKey}`
            );
            const articles = response.data.articles.map(article => ({
                title: article.title,
                url: article.url,
                urlToImage: article.urlToImage,
            }));
            res.json(articles);
        } catch (error) {
            res.status(500).send('Error fetching articles');
        }

    }
}

export default ArticleController;