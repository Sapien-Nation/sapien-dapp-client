interface Props {
  className?: string;
}

const FullLogo = ({ className }: Props) => (
  <svg
    fill="none"
    height="40"
    viewBox="0 0 259 101"
    width="140"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M37.6869 0.854393C36.9129 2.52496 35.3775 4.28478 33.1804 6.00635C32.5937 6.46544 30.7461 7.84269 29.0734 9.06692C24.6792 12.2678 22.4946 14.2826 21.059 16.4505C20.8219 16.7949 20.5972 17.0882 20.5472 17.0882C20.4973 17.0882 20.4224 16.9606 20.3725 16.8076C19.998 15.5834 18.3876 12.6248 17.6136 11.7449L17.1143 11.1711L15.504 12.8289C13.4692 14.8948 12.2084 16.6036 10.6105 19.4473C9.38711 21.6408 7.95153 25.2369 7.22749 27.9914C7.07769 28.5525 6.92789 29.0881 6.90293 29.1774C6.86548 29.2794 6.55339 29.0881 6.04157 28.6546C5.16774 27.8894 4.33136 27.3538 3.81954 27.2263C3.50745 27.137 3.45752 27.188 2.89577 28.3995C0.186882 34.1763 -0.67447 41.764 0.536416 48.9691C1.17307 52.7565 2.40892 56.2379 4.04424 58.8267C4.34384 59.2985 4.59351 59.7448 4.59351 59.8086C4.59351 59.8851 4.33136 60.2804 3.9943 60.6885C1.79723 63.4813 0.836016 67.1922 1.41025 70.6481C2.30905 76.2081 6.31621 80.3399 11.709 81.2963C13.8062 81.6789 14.4179 82.2655 15.067 84.5482C15.5539 86.257 16.7648 88.9223 17.6761 90.2868C20.5098 94.495 24.854 97.7342 29.9097 99.4175C39.0476 102.44 49.2839 100.208 55.8252 93.7554C58.7088 90.9116 60.3567 88.0551 61.5051 83.9743C61.9545 82.393 62.8408 81.6152 64.4637 81.3601C68.6706 80.697 72.2034 77.9807 74.0259 74.0147C74.75 72.4334 75.0121 71.2475 75.087 69.2709C75.2368 65.6492 74.4129 63.239 71.9911 60.1657L71.7165 59.8214L72.3157 58.8904C73.0397 57.781 74.2132 55.2815 74.6626 53.9425C75.861 50.2826 76.3728 46.8905 76.3728 42.5291C76.3728 38.8947 76.1106 36.6375 75.2992 33.4112C74.6875 30.9627 73.252 27.3793 72.815 27.2135C72.5404 27.0988 71.2671 27.8512 70.3808 28.6546C69.6068 29.3432 69.5818 29.3559 69.4945 29.0626C69.4445 28.8969 69.2073 28.0424 68.9577 27.188C67.6844 22.7757 65.4623 18.2996 62.9157 15.0478C61.9545 13.8236 60.1944 11.9617 59.5327 11.4899L59.1707 11.2221L58.6839 11.8979C57.6228 13.3262 56.5492 15.3666 55.9625 17.0627C55.8252 17.4197 55.6879 17.6875 55.6379 17.6365C55.6005 17.5728 55.3758 16.9606 55.1511 16.2593C52.7668 8.6971 46.6874 2.63972 39.1225 0.306038C38.5732 0.140259 38.1113 -1.52588e-05 38.0988 -1.52588e-05C38.0863 -1.52588e-05 37.8991 0.382553 37.6869 0.854393ZM27.875 42.95C30.0845 43.5748 31.8447 44.5695 33.455 46.0998C34.1915 46.8012 35.6271 48.561 35.9392 49.1604C36.064 49.3644 36.3886 49.7087 36.6632 49.9255C37.1002 50.2316 37.3373 50.3081 38.0239 50.3463C39.1724 50.4101 39.7841 50.0785 40.5705 48.9691C42.4181 46.3676 43.8911 45.0286 46.1007 43.9319C48.2603 42.8479 49.0717 42.6567 51.5309 42.6567C53.8903 42.6567 54.7267 42.8224 56.5617 43.6258C58.197 44.3527 59.5577 45.3347 60.9059 46.7757C63.5025 49.5685 64.8257 52.8075 64.9755 56.748C65.1128 60.4972 64.3388 63.443 62.4414 66.3378C60.8185 68.8118 57.9598 71.0689 55.5381 71.8086C55.251 71.8978 54.9763 72.0381 54.9389 72.1274C54.9139 72.2039 55.0637 72.6375 55.2759 73.0711C56.2122 74.9712 56.699 77.1773 56.6865 79.511C56.6865 82.5843 55.8876 85.1858 54.1399 87.8638C50.757 93.0668 44.1158 96.2931 37.4247 95.9871C33.3801 95.7958 30.2093 94.7628 26.9387 92.5822C25.4906 91.613 23.1063 89.2283 22.2575 87.8893C19.2739 83.1709 18.8869 77.6237 21.1964 72.9308C21.4211 72.4972 21.5459 72.1019 21.4835 72.0509C21.4335 71.9999 21.0216 71.8341 20.5722 71.6811C18.7496 71.0307 17.0893 69.9212 15.5789 68.3527C10.9475 63.5323 10.0238 55.6768 13.3943 49.6067C15.3417 46.087 18.6498 43.5876 22.4447 42.7714C23.6181 42.5164 26.714 42.6184 27.875 42.95Z"
      fill="#6200EA"
    />
    <path
      d="M25.7275 55.3453C24.8037 55.6386 23.8175 57.0796 23.3806 58.7884C23.081 59.9616 23.0935 62.3973 23.4181 63.5068C24.1171 65.917 25.3904 67.1667 26.8635 66.8734C27.4627 66.7714 28.4863 65.815 28.8733 65.0243C29.4351 63.9021 29.6847 62.6907 29.6847 61.0839C29.6722 59.018 29.2728 57.5642 28.3989 56.3782C27.7248 55.4728 26.6513 55.0647 25.7275 55.3453Z"
      fill="#6200EA"
    />
    <path
      d="M49.0843 55.4601C47.1743 56.34 46.1382 60.3442 46.9871 63.5706C47.811 66.7204 50.1204 67.8936 51.7432 66.0063C54.165 63.2008 53.6157 56.7481 50.8444 55.4601C50.2078 55.1668 49.7334 55.1668 49.0843 55.4601Z"
      fill="#6200EA"
    />
    <path
      d="M34.6035 73.2497C33.7421 73.6323 33.5299 74.6652 34.1665 75.3921C34.5161 75.8002 34.566 75.8129 35.5147 75.8129H36.4884V75.1115C36.476 74.3081 36.2513 73.7725 35.8019 73.441C35.34 73.1094 35.0404 73.0584 34.6035 73.2497Z"
      fill="#6200EA"
    />
    <path
      d="M40.7951 73.3006C40.2459 73.5684 39.9213 74.2188 39.8839 75.1242L39.8589 75.8128L40.6953 75.8511C41.2695 75.8766 41.6565 75.8256 41.9062 75.6853C42.3181 75.4685 42.6676 74.9074 42.6676 74.4611C42.6676 74.0148 42.1933 73.3644 41.7688 73.2114C41.282 73.0328 41.307 73.0328 40.7951 73.3006Z"
      fill="#6200EA"
    />
    <path
      d="M28.6618 81.0794C29.4233 82.1633 31.1834 83.4896 32.7563 84.1654C34.6663 84.9816 35.3653 85.0964 38.1117 85.1091C40.3462 85.1219 40.7207 85.0964 41.7194 84.8286C44.0288 84.2037 46.076 83.0177 47.3369 81.5895C47.7238 81.1559 48.011 80.7861 47.986 80.7606C47.961 80.735 47.4118 80.9391 46.7751 81.2196C41.994 83.2855 35.5401 83.413 30.4344 81.5384C29.9226 81.3599 29.2859 81.0921 29.0363 80.9646C28.4246 80.6458 28.3747 80.6585 28.6618 81.0794Z"
      fill="#6200EA"
    />
    <path
      d="M109.877 73.1089C115.874 73.1089 122.852 69.8715 122.852 61.9064C122.852 54.8663 117.838 53.2218 111.48 50.7552C107.293 49.1108 105.277 48.1345 105.329 45.8734C105.329 43.561 107.19 42.2249 109.722 42.2249C111.997 42.2249 114.685 43.304 117.735 45.822L121.922 40.3749C118.355 37.3944 114.116 35.6986 109.567 35.75C102.951 35.8528 97.7817 40.3235 97.7817 46.1817C97.7817 53.0677 103.313 55.6371 108.844 57.5898C113.289 59.08 115.253 60.0564 115.253 62.7286C115.253 64.9896 113.496 66.5826 109.981 66.5826C107.086 66.5826 103.571 65.1952 100.831 62.0091L96.4894 67.3535C100.315 71.3103 105.122 73.1089 109.877 73.1089Z"
      fill="#312737"
    />
    <path
      d="M146.423 47.6206V50.4469H146.268C144.458 48.2886 141.874 47.2095 138.876 47.2095C132.104 47.2095 126.987 52.6052 126.987 60.2106C126.987 67.9701 132.052 73.1089 139.031 73.1089C142.287 73.1089 144.872 71.8756 146.578 69.6659H146.733V72.6978H153.143V47.6206H146.423ZM140.271 67.0965C136.498 67.0965 133.81 64.3216 133.81 60.262C133.81 55.9454 136.705 53.2218 140.323 53.2218C143.993 53.2218 146.681 56.2537 146.681 60.262C146.681 64.373 143.786 67.0965 140.271 67.0965Z"
      fill="#312737"
    />
    <path
      d="M174.306 47.2095C171.205 47.2095 168.568 48.34 166.656 50.4983H166.552V47.6206H159.781V82.8725H166.552V69.8715H166.656C168.413 71.927 170.895 73.1089 174.099 73.1089C181.129 73.1089 186.195 67.9701 186.195 60.2106C186.195 52.6052 181.078 47.2095 174.306 47.2095ZM172.859 67.0965C169.189 67.0965 166.294 64.373 166.294 60.262C166.294 56.2537 168.982 53.2218 172.859 53.2218C176.477 53.2218 179.32 55.9454 179.32 60.262C179.32 64.3216 176.684 67.0965 172.859 67.0965Z"
      fill="#312737"
    />
    <path
      d="M195.406 44.0748C197.732 44.0748 199.645 42.2249 199.645 39.9638C199.645 37.7028 197.732 35.8528 195.406 35.8528C193.132 35.8528 191.219 37.7028 191.219 39.9638C191.219 42.2249 193.132 44.0748 195.406 44.0748ZM191.994 72.6978H198.766V47.6206H191.994V72.6978Z"
      fill="#312737"
    />
    <path
      d="M229.439 59.9022C229.439 52.5538 224.477 47.2095 217.085 47.2095C209.9 47.2095 204.576 52.5024 204.576 60.1078C204.576 67.9701 210.158 73.1089 217.55 73.1089C222.616 73.1089 226.286 71.1048 228.457 68.3812L224.063 64.3216C222.668 66.0174 220.703 67.1993 218.015 67.1479C214.759 67.1479 212.381 65.298 211.554 62.3175H229.284C229.439 61.9064 229.439 60.7244 229.439 59.9022ZM217.292 53.1191C220.238 53.1191 222.047 54.8663 222.719 57.487H211.606C212.381 54.6093 214.552 53.1191 217.292 53.1191Z"
      fill="#312737"
    />
    <path
      d="M249.784 47.2095C246.682 47.2095 243.787 48.4428 241.72 50.858H241.616V47.6206H234.845V72.6978H241.616V60.0564C241.616 55.5857 243.942 53.2218 247.354 53.2218C250.507 53.2218 252.213 54.7121 252.213 59.4911V72.6978H258.985V57.7954C258.985 50.0872 255.211 47.2095 249.784 47.2095Z"
      fill="#312737"
    />
  </svg>
);

export default FullLogo;