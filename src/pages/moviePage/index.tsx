import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AppLayout } from '@pages/layout';
import { appIsLoading } from '@redux/reducers/appSlice';
import { useGetMovieDetailsQuery } from '@redux/services/moviesService';
import { MovieVideo } from '@redux/appTypes';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const MovieDetailPage: FC = () => {
    const location = useLocation();
    const movieID = location.state;
    const { data: movieInfo } = useGetMovieDetailsQuery(movieID);
    const videosArray: MovieVideo[] = movieInfo?.videos?.results || [];

    return (
        <AppLayout>
            {videosArray && (
                <div>
                    <iframe
                        width={500}
                        height={281}
                        className='video'
                        title='Youtube player'
                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                        src={`https://youtube.com/embed/${videosArray[0]?.key}?autoplay=0`}
                    ></iframe>
                </div>
            )}
            <div></div>
        </AppLayout>
    );
};
