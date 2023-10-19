'use client'

import React from 'react'
import YouTube from 'react-youtube'

interface YouTubeProps {
  videoURL: string
}

const Youtube: React.FC<YouTubeProps> = ({ videoURL }) => {
  const youtube_parser = (url: string) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = url.match(regExp)
    return match && match[7].length == 11 ? match[7] : ''
  }
  const opts = {
    height: '390',
    width: '640',
  }
  return (
    !!videoURL && (
      <YouTube
        videoId={youtube_parser(videoURL)}
        className="flex items-center justify-center"
        opts={opts}
      />
    )
  )
}

export default Youtube
