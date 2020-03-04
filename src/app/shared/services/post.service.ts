import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, MediaType } from '../models/post';
import { map } from 'rxjs/operators';
import { environment } from "environments/environment";

//'https://lotweb.cweb.bg/wp-json/wp/v2/'
// const BASE_URL = environment.wp_url;
const BASE_URL = environment.apiUrl;
const WP_API_URL = BASE_URL + 'wp-json/wp/v2/';//todo: must be deleted

const LAST_4_POSTS_END_URL = 'posts?per_page=4';//todo: must be deleted
const MEDIA_END_URL = 'media/';//todo: must be deleted
//const WELLBEING_END_URL = 'wellbeing?per_page=100';
const HELP_END_URL = 'app_help?per_page=100';//todo: must be deleted


const WELLBEING_END_URL = 'articles';
const BASE_POST_IMAGE_URL = BASE_URL + 'admin/assets/img/articles/';
//https://lifeontime.co.uk/api/admin/assets/img/articles/5e3896ba819b4.jpeg
const BASE_POST_AUDIO_URL = BASE_URL + 'admin/assets/audio/articles/';

@Injectable( {
  providedIn: 'root'
} )
export class PostService {

  constructor (
    private http: HttpClient
  ) { }

  getArticlesByCategoryIdAndUserClassId( categoryId: string, classId: string ) {
    return this.http.get( BASE_URL + WELLBEING_END_URL )
      .pipe(
        map( posts => {
          return posts[ 'data' ].filter( post => post.categories.includes( categoryId ) & post.classes.includes( classId ) ).
            map( post => {
              //
              //id: 3,
              // title: "Lets Talk about sleep!",
              //   categories: "1",
              //     image: "5e4bb93e71688.jpg",
              //       classes: "1,2,3,4",
              //         content: "<p style="text - align: center; "><br></p><p style="text - align: center; "><br></p><p style="text - align: center; "><iframe frameborder="0" src="//www.youtube.com/embed/q_9_fCgl7yY?start=8" width="640" height="360" class="note-video-clip"></iframe><br></p>",
              // audio: null,
              //   created_at: "2020-02-18 10:07:32",
              //     updated_at: "2020-02-18 10:17:06"
              return {
                id: post.id,
                title: post.title,
                content: post.content,
                imageUrl: post.image ? BASE_POST_IMAGE_URL + post.image : null,
                audioUrl: post.audio ? BASE_POST_AUDIO_URL + post.audio : null,
              };
            } )
        } )
      );
  }



  getLats4Posts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>( WP_API_URL + LAST_4_POSTS_END_URL )
      .pipe(
        map( posts => {
          return posts.map( post => {
            return this.GetImagePostsDataFromAPI( post );
          } )
        } )
      );
  }
  getPostMedia( mediaId: string ): Observable<string> {
    return this.http.get( WP_API_URL + MEDIA_END_URL + mediaId )
      .pipe(
        map( media => media[ 'guid' ][ 'rendered' ] )
      )
  }

  getHelpPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>( WP_API_URL + HELP_END_URL )
      .pipe(
        map( posts => {
          return posts.map( post => {
            return this.GetImagePostsDataFromAPI( post );
          } );
        } )
      )
  }

  // getWellbeingPostByCAtegoryAndAppType( appWPId: string, wellbeingCategory: string ): Observable<Array<BlogPost>> {
  //   const options = {
  //     params: {
  //       wellbeing_apps: appWPId,
  //       wellbeing_categories: WellbeingInfo.categoryId[ wellbeingCategory ],
  //     }
  //   }
  //   return this.http
  //     .get<Array<BlogPost>>( WP_API_URL + WELLBEING_END_URL, options )
  //     .pipe(
  //       map( posts => {
  //         return posts.map( post => {
  //           return this.getAllKindsPostDataFromAPI( post );
  //         } )
  //       } )
  //     )
  // }

  private GetImagePostsDataFromAPI( post ): Post {
    const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
    const blogPost: Post = {
      id: post[ 'id' ],
      date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
      title: post[ 'title' ][ 'rendered' ],
      imageUrl: '',
      mediaType: MediaType.image,
      mediaId: post[ 'featured_media' ],
      shortContent: post[ 'content' ][ 'rendered' ].length > 200 ? `${post[ 'content' ][ 'rendered' ].substring( 0, 200 )} ...` : `${post[ 'content' ][ 'rendered' ]}`,
      content: post[ 'content' ][ 'rendered' ],
      link: post[ 'link' ],
    };
    return blogPost;
  }

  private getAllKindsPostDataFromAPI( post ): Post {
    const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
    //contentTypeId: {
    // video: 14,
    //   publication: 19,
    //     audio: 20,
    //}
    const mediaType = this.setMediaType( post[ 'wellbeing_type' ][ 0 ] );
    const blogPost: Post = {
      id: post[ 'id' ],
      date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
      mediaType: mediaType,
      title: post[ 'title' ][ 'rendered' ],
      content: post[ 'content' ][ 'rendered' ],
      link: post[ 'link' ],
    };

    if ( mediaType === MediaType.image ) {
      blogPost.mediaId = post[ 'featured_media' ];
      blogPost.shortContent = post[ 'content' ][ 'rendered' ].length > 200 ? `${post[ 'content' ][ 'rendered' ].substring( 0, 200 )} ...` : `${post[ 'content' ][ 'rendered' ]}`
    }
    return blogPost;
  }

  private setMediaType( mediaTypeId: number ): MediaType {
    switch ( mediaTypeId ) {
      case 14: return MediaType.video;
      case 19: return MediaType.image;
      case 20: return MediaType.audio;
      default: return MediaType.image;
    }
  }

}
