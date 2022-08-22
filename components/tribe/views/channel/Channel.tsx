import {
  ArrowNarrowLeftIcon,
  ArrowsExpandIcon,
  RefreshIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import useSWR, { useSWRConfig } from 'swr';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

// api
import axios from 'axios';
import {
  createContent,
  createLinkContent,
  createMediaContent,
  uploadContentMedia,
} from 'api/content';

// components
import { ContentItemChannel } from 'components/content';
import { Query, TextInput, TextInputLabel } from 'components/common';
import { InlineEditor, ExpandedEditor } from 'tinymc';
import ChannelHeader from './ChannelHeader';
import ChannelLeftBar from './ChannelLeftBar';
import ChannelHeaderPlaceholder from './ChannelHeaderPlaceholder';

// context
import { useToast } from 'context/toast';

// constants
import { ContentType } from 'tools/constants/content';

// hooks
import { useChannel, useChannelPermissions } from 'hooks/channel';

// types
import type { Content } from 'tools/types/content';

interface Props {
  apiKey: string;
}

type Media = {
  key: string;
  url: string;
};

interface PostFormProps {
  title: string;
}

interface MediaFormProps {
  title: string;
  media: null | Media;
}

interface LinkFormProps {
  title: string;
  link: string;
  description: string;
}

const Channel = ({ apiKey }: Props) => {
  const [postType, setPostType] = useState<ContentType>(ContentType.POST);
  const [hasContent, setHasContent] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [isPublishing, setPublishing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mediaMimeType, setMediaMimeType] = useState('');
  const [initialEditorValue, setInitialEditorValue] = useState('');
  const isPublishDisabled = isPublishing || !hasContent;

  const toast = useToast();
  const channel = useChannel();
  const { mutate } = useSWRConfig();
  const { push, query } = useRouter();
  const { data: swrData } = useSWR(apiKey);
  const mediaFileInputRef = useRef(null);

  const mediaMethods = useForm<MediaFormProps>({
    defaultValues: {
      media: null,
      title: '',
    },
  });
  const {
    formState: { errors: mediaErrors, isSubmitting: isSubmittingMediaForm },
    handleSubmit: handleSubmitMediaForm,
    setValue,
    watch: watchMediaForm,
  } = mediaMethods;

  const linkMethods = useForm<LinkFormProps>({
    defaultValues: {
      title: '',
      link: '',
      description: '',
    },
  });
  const {
    formState: { errors: linkErrors, isSubmitting: isSubmittingLinkForm },
    handleSubmit: handleSubmitLinkForm,
  } = linkMethods;

  const postMethods = useForm<PostFormProps>({
    defaultValues: {
      title: '',
    },
  });
  const {
    formState: { errors: postErrors },
    handleSubmit: handleSubmitPostForm,
  } = postMethods;

  const tribeID = query.tribeID as string;
  const channelID = query.viewID as string;

  const [media] = watchMediaForm(['media']);
  const [canPost] = useChannelPermissions(channelID, ['canPost']);

  const editorRef = useRef(null);

  useEffect(() => {
    setShowEditor(false);
  }, [channelID]);

  const onSubmitMedia = async ({ title, media }: MediaFormProps) => {
    try {
      setPublishing(true);

      const response: Content = await createMediaContent({
        title,
        media: media?.key,
        preview: media?.url,
        mimeType: mediaMimeType,
        groupId: channel.id,
      });

      setMediaMimeType('');
      setPublishing(false);
      push(`/tribes/${tribeID}/content?id=${response.id}`);

      mutate(apiKey);
    } catch (error) {
      setPublishing(false);
      toast({
        message: error,
      });
    }
  };

  const onSubmitLink = async ({ title, link, description }: LinkFormProps) => {
    try {
      setPublishing(true);

      const response: Content = await createLinkContent({
        title,
        link,
        data: description,
        groupId: channel.id,
      });

      setPublishing(false);
      push(`/tribes/${tribeID}/content?id=${response.id}`);

      mutate(apiKey);
    } catch (error) {
      setPublishing(false);
      toast({
        message: error,
      });
    }
  };

  const onSubmitPost = async ({ title }: PostFormProps) => {
    try {
      setPublishing(true);
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        editorRef.current.setDirty(false);

        const response: Content = await createContent({
          mimeType: 'text/html',
          data: content,
          groupId: channel.id,
          title,
        });

        setPublishing(false);
        push(`/tribes/${tribeID}/content?id=${response.id}`);

        mutate(apiKey);
      }
    } catch (error) {
      setPublishing(false);
      toast({
        message: error,
      });
    }
  };

  const handleOnContentChange = (rawContent: string) => {
    const textOnlyContent = editorRef.current.getContent({
      format: 'text',
    });

    const isImgTag = /\<img\s+src=.*\">/.test(rawContent);

    setHasContent(Boolean(textOnlyContent.trim().length) || isImgTag);
  };

  const handleUploadImage = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();

      formData.append('file', file);

      const fileData: Media = await uploadContentMedia(formData);

      setValue('media', fileData);
    } catch (error) {
      toast({
        message: error,
      });
    }

    setIsUploading(false);
  };

  const renderInlineFormView = () => {
    switch (postType) {
      case ContentType.POST:
        return (
          <FormProvider {...postMethods}>
            <form
              onSubmit={handleSubmitPostForm(onSubmitPost)}
              id="content-form"
            >
              <div className="px-4 space-y-6">
                <div className="flex gap-x-4 items-end">
                  <div className="flex-1">
                    <TextInputLabel
                      label="Title"
                      name="title"
                      error={postErrors?.title?.message}
                    />
                    <TextInput
                      name="title"
                      aria-label="title"
                      placeholder="Title"
                      rules={{
                        validate: {
                          required: (value) =>
                            value.length > 0 || 'is required',
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="relative h-auto min-h-[160px] max-h-48 overflow-auto rounded-md outline-0 border-none ring-0 p-4 bg-sapien-neutral-800">
                  <button
                    className="absolute top-3 right-3 z-10"
                    type="button"
                    onClick={() => {
                      setInitialEditorValue(editorRef.current?.getContent());
                      setShowEditor(true);

                      queueMicrotask(() => {
                        setTimeout(() => {
                          editorRef.current?.execCommand('SelectAll', false);
                        }, 500);
                      });
                    }}
                  >
                    <ArrowsExpandIcon className="w-4 h-4" />
                  </button>
                  <InlineEditor
                    editorRef={editorRef}
                    onChange={handleOnContentChange}
                    initialValue={initialEditorValue}
                  />
                </div>
                <div className="flex justify-end w-full">
                  <button
                    type="submit"
                    form="content-form"
                    className={`${
                      isPublishDisabled
                        ? 'cursor-not-allowed bg-primary/50'
                        : 'cursor-pointer bg-primary hover:bg-sapien-80'
                    } min-w-[70px] flex items-center justify-center gap-2 rounded-xl border border-transparent shadow-sm px-2 py-2 text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm`}
                    disabled={isPublishDisabled}
                  >
                    {isPublishing ? (
                      <RefreshIcon className="w-5 animate-spin" />
                    ) : (
                      <>Post</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        );
      case ContentType.MEDIA:
        return (
          <FormProvider {...mediaMethods}>
            <form
              id="media-form"
              className="sm:overflow-hidden"
              onSubmit={handleSubmitMediaForm(onSubmitMedia)}
            >
              <div className="px-4 space-y-6">
                <div>
                  <div className="flex gap-x-4 items-end">
                    <div className="flex-1">
                      <TextInputLabel
                        label="Title"
                        name="title"
                        error={mediaErrors?.title?.message}
                      />
                      <TextInput
                        name="title"
                        autoFocus
                        aria-label="title"
                        placeholder="Title"
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mt-4 mb-2">
                      Upload Media
                    </label>
                    <div className="mt-1 relative min-h-8-75 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      {Boolean(media) ? (
                        <span className="relative">
                          <button
                            aria-label="Remove Selected Cover"
                            type="button"
                            className="absolute z-10 -top-1 -right-1 inline-flex items-center p-1 bg-gray-900 rounded-full shadow-sm text-white focus:outline-none"
                            onClick={() => {
                              setValue('media', null);
                            }}
                          >
                            <XIcon
                              className="h-3 w-3 text-white"
                              aria-hidden="true"
                            />
                          </button>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="cover"
                            className="w-100 relative rounded-md"
                            src={media.url}
                            data-key={media.key}
                            onClick={() => {
                              mediaFileInputRef.current.click();
                            }}
                          />
                        </span>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="text-sm text-gray-600">
                            <label
                              htmlFor="cover-upload"
                              className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                ref={mediaFileInputRef}
                                id="cover-upload"
                                name="cover-upload"
                                type="file"
                                accept="image/*, video/*, audio/*"
                                disabled={isUploading}
                                className="sr-only"
                                onChange={(event) => {
                                  const file = event.target.files[0];

                                  if (file) {
                                    handleUploadImage(file);
                                    setMediaMimeType(file.type);
                                    mediaFileInputRef.current.value = '';
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            Audio, Image or Video
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    type="submit"
                    form="media-form"
                    className={`${
                      isSubmittingMediaForm
                        ? 'cursor-not-allowed bg-primary/50'
                        : 'cursor-pointer bg-primary hover:bg-sapien-80'
                    } min-w-[70px] flex items-center justify-center gap-2 rounded-xl border border-transparent shadow-sm px-2 py-2 text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm`}
                    disabled={isSubmittingMediaForm}
                  >
                    {isSubmittingMediaForm ? (
                      <RefreshIcon className="w-5 animate-spin" />
                    ) : (
                      <>Post</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        );
      case ContentType.LINK:
        return (
          <FormProvider {...linkMethods}>
            <form
              id="link-form"
              className="sm:overflow-hidden"
              onSubmit={handleSubmitLinkForm(onSubmitLink)}
            >
              <div className="px-4 space-y-11">
                <div>
                  <div className="flex gap-x-4 items-end">
                    <div className="flex-1">
                      <TextInputLabel
                        label="Title"
                        name="title"
                        error={linkErrors?.title?.message}
                      />
                      <TextInput
                        name="title"
                        autoFocus
                        aria-label="title"
                        placeholder="Title"
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex-1">
                      <TextInputLabel
                        label="Link"
                        name="link"
                        error={linkErrors?.link?.message}
                      />
                      <TextInput
                        name="link"
                        aria-label="Link"
                        placeholder="Link"
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex-1">
                      <TextInputLabel
                        label="Description"
                        name="description"
                        error={linkErrors?.description?.message}
                      />
                      <TextInput
                        name="description"
                        aria-label="description"
                        placeholder="Description"
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end w-full">
                  <button
                    type="submit"
                    form="link-form"
                    className={`${
                      isSubmittingLinkForm
                        ? 'cursor-not-allowed bg-primary/50'
                        : 'cursor-pointer bg-primary hover:bg-sapien-80'
                    } min-w-[70px] flex items-center justify-center gap-2 rounded-xl border border-transparent shadow-sm px-2 py-2 text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm`}
                    disabled={isSubmittingLinkForm}
                  >
                    {isSubmittingLinkForm ? (
                      <RefreshIcon className="w-5 animate-spin" />
                    ) : (
                      <>Post</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        );
    }
  };
  let mutateFetchAPI = apiKey;
  return (
    <>
      <h1 className="sr-only">{channel.name}</h1>
      <div className="h-full flex flex-row bg-sapien-neutral-800 lg:rounded-tl-3xl">
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid gap-4">
            <ChannelHeader
              canPost={canPost}
              showEditor={() => setShowEditor(true)}
              channel={channel}
              showMembers={() => setShowMembers(!showMembers)}
            />
            {canPost === true && (
              <div className="bg-sapien-neutral-600 py-3 rounded-xl mb-4 overflow-y-auto">
                <nav className="grid grid-cols-3" aria-label="Tabs">
                  <button
                    onClick={() => setPostType(ContentType.POST)}
                    className={
                      postType === ContentType.POST
                        ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        : 'border-b-2 border-sapien-20 hover:border-indigo-500 text-white whitespace-nowrap py-4 px-1 font-medium text-sm'
                    }
                    aria-current={
                      postType === ContentType.POST ? 'page' : undefined
                    }
                  >
                    Post
                  </button>
                  <button
                    onClick={() => setPostType(ContentType.MEDIA)}
                    className={
                      postType === ContentType.MEDIA
                        ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        : 'border-b-2 border-sapien-20 hover:border-indigo-500 text-white whitespace-nowrap py-4 px-1 font-medium text-sm'
                    }
                    aria-current={
                      postType === ContentType.MEDIA ? 'page' : undefined
                    }
                  >
                    Media
                  </button>
                  <button
                    onClick={() => setPostType(ContentType.LINK)}
                    className={
                      postType === ContentType.LINK
                        ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        : 'border-b-2 border-sapien-20 hover:border-indigo-500 text-white whitespace-nowrap py-4 px-1 font-medium text-sm'
                    }
                    aria-current={
                      postType === ContentType.LINK ? 'page' : undefined
                    }
                  >
                    Link
                  </button>
                </nav>
                <div className="flex gap-2 lg:rounded-3xl p-4 pb-2 min-h-[350px]">
                  {showEditor === false && (
                    <div className="relative flex-col flex-1">
                      {renderInlineFormView()}
                    </div>
                  )}
                </div>
              </div>
            )}
            <InfiniteScroll
              className="scroll-auto mt-4"
              pageStart={0}
              loadMore={async (cursor: string) => {
                try {
                  mutateFetchAPI = `${apiKey}?nextCursor=${cursor}&limit=25`;
                  const response = await axios(mutateFetchAPI);
                  mutate(
                    apiKey,
                    ({ data }) => {
                      return {
                        data: [...data, ...response?.data?.data],
                        nextCursor: response?.data?.nextCursor,
                      };
                    },
                    false
                  );
                } catch (err) {
                  // err
                }
              }}
              hasMore={swrData?.nextCursor !== null}
              loader={null}
              useWindow={false}
              initialLoad={false}
              threshold={450}
            >
              <ul>
                {swrData?.data.map((content) => (
                  <li className="mb-8 last:mb-0" key={content.id}>
                    <Link
                      href={`/tribes/${tribeID}/content?id=${content.id}`}
                      passHref
                    >
                      <a>
                        <ContentItemChannel
                          content={content}
                          tribeID={tribeID as string}
                        />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          </div>
        </div>
        <div
          className={`bg-sapien-neutral-800 h-full fixed bottom-0 lg:static lg:right-0 transition-all duration-300 ${
            showMembers ? 'right-0 lg:hidden' : '-right-full'
          }`}
        >
          <ChannelLeftBar />
        </div>
      </div>

      {/* Editor */}
      {showEditor && (
        <>
          <FormProvider {...postMethods}>
            <form
              onSubmit={handleSubmitPostForm(onSubmitPost)}
              id="content-form"
            >
              <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center bg-sapien-neutral-800">
                <div className="flex flex-col gap-5 mb-4 w-full">
                  <div className="flex justify-between pt-5 px-8">
                    <button
                      className="flex items-center gap-2 border border-transparent text-base font-medium text-white focus:outline-none sm:text-sm"
                      onClick={() => {
                        setInitialEditorValue(editorRef.current?.getContent());
                        setShowEditor(false);

                        queueMicrotask(() => {
                          setTimeout(() => {
                            editorRef.current?.execCommand('SelectAll', false);
                          }, 500);
                        });
                      }}
                    >
                      <ArrowNarrowLeftIcon className="text-white w-5" /> Back
                    </button>
                    <div className="w-full max-w-[650px] px-3">
                      <TextInput
                        name="title"
                        aria-label="title"
                        placeholder="Enter title"
                        rules={{
                          validate: {
                            required: (value) =>
                              value.length > 0 || 'is required',
                          },
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      form="content-form"
                      className={`min-w-[70px] flex items-center justify-center gap-2 rounded-xl border border-transparent shadow-sm px-2 py-2 text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary sm:text-sm
                                            ${
                                              isPublishDisabled
                                                ? 'cursor-not-allowed bg-primary/50'
                                                : 'cursor-pointer bg-primary hover:bg-sapien-80'
                                            }`}
                      disabled={isPublishDisabled}
                    >
                      {isPublishing ? (
                        <RefreshIcon className="w-5 animate-spin" />
                      ) : (
                        <>Post</>
                      )}
                    </button>
                  </div>
                  <ExpandedEditor
                    editorRef={editorRef}
                    initialValue={initialEditorValue}
                    onChange={handleOnContentChange}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

const ChannelProxy = () => {
  const { query } = useRouter();

  const channelID = query.viewID as string;

  const [canView] = useChannelPermissions(channelID, ['canView']);

  if (canView === false) {
    return (
      <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden h-full w-full">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/27/w1200X800/Metaverse_is_Coming.jpg"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="px-4 py-4 flex flex-col gap-4 absolute justify-center items-center w-full text-center h-full">
          <p>You don&apos;t have access to see this view </p>
        </div>
      </div>
    );
  }
  const apiKey = `/core-api/channel/${channelID}/feed`;

  return (
    <>
      <h1 className="sr-only">Channel View</h1>
      <Query api={apiKey} loader={<ChannelHeaderPlaceholder />}>
        {() => <Channel apiKey={apiKey} />}
      </Query>
    </>
  );
};

export default ChannelProxy;
