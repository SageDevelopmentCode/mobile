// Book Images Mapping
// This file imports all book images from assets and provides easy access by book name

// Old Testament Books
import GenesisImage from "../../assets/images/books/Genesis.png";
import ExodusImage from "../../assets/images/books/Exodus.png";
import LeviticusImage from "../../assets/images/books/Leviticus.png";
import DeuteronomyImage from "../../assets/images/books/Deuteronomy.png";
import JoshuaImage from "../../assets/images/books/Joshua.png";
import JudgesImage from "../../assets/images/books/Judges.png";
import RuthImage from "../../assets/images/books/Ruth.png";
import FirstSamuelImage from "../../assets/images/books/1 Samuel.png";
import SecondSamuelImage from "../../assets/images/books/2 Samuel.png";
import FirstKingsImage from "../../assets/images/books/1 Kings.png";
import SecondKingsImage from "../../assets/images/books/2 Kings.png";
import FirstChroniclesImage from "../../assets/images/books/1 Chronicles.png";
import SecondChroniclesImage from "../../assets/images/books/2 Chronicles.png";
import EzraImage from "../../assets/images/books/Ezra.png";
import NehemiahImage from "../../assets/images/books/Nehemiah.png";
import EstherImage from "../../assets/images/books/Esther.png";
import JobImage from "../../assets/images/books/Job.png";
import PsalmsImage from "../../assets/images/books/Psalms.png";
import ProverbsImage from "../../assets/images/books/Proverbs.png";
import EcclesiastesImage from "../../assets/images/books/Ecclesiastes.png";
import SongOfSongsImage from "../../assets/images/books/Song of Songs.png";
import IsaiahImage from "../../assets/images/books/Isaiah.png";
import JeremiahImage from "../../assets/images/books/Jeremiah.png";
import LamentationsImage from "../../assets/images/books/Lamentations.png";
import EzekielImage from "../../assets/images/books/Ezekiel.png";
import DanielImage from "../../assets/images/books/Daniel.png";
import HoseaImage from "../../assets/images/books/Hosea.png";
import JoelImage from "../../assets/images/books/Joel.png";
import AmosImage from "../../assets/images/books/Amos.png";
import ObadiahImage from "../../assets/images/books/Obadiah.png";
import JonahImage from "../../assets/images/books/Jonah.png";
import MicahImage from "../../assets/images/books/Micah.png";
import NahumImage from "../../assets/images/books/Nahum.png";
import HabakkukImage from "../../assets/images/books/Habakkuk.png";
import ZephaniahImage from "../../assets/images/books/Zephaniah.png";
import HaggaiImage from "../../assets/images/books/Haggai.png";
import ZechariahImage from "../../assets/images/books/Zechariah.png";
import MalachiImage from "../../assets/images/books/Malachi.png";

// New Testament Books
import MatthewImage from "../../assets/images/books/Matthew.png";
import MarkImage from "../../assets/images/books/Mark.png";
import LukeImage from "../../assets/images/books/Luke.png";
import JohnImage from "../../assets/images/books/John.png";
import ActsImage from "../../assets/images/books/Acts.png";
import RomansImage from "../../assets/images/books/Romans.png";
import FirstCorinthiansImage from "../../assets/images/books/1 Corinthians.png";
import SecondCorinthiansImage from "../../assets/images/books/2 Corinthians.png";
import GalatiansImage from "../../assets/images/books/Galatians.png";
import EphesiansImage from "../../assets/images/books/Ephesians.png";
import PhilippiansImage from "../../assets/images/books/Philippians.png";
import ColossiansImage from "../../assets/images/books/Colossians.png";
import FirstThessaloniansImage from "../../assets/images/books/1 Thessalonians.png";
import SecondThessaloniansImage from "../../assets/images/books/2 Thessalonians.png";
import FirstTimothyImage from "../../assets/images/books/1 Timothy.png";
import SecondTimothyImage from "../../assets/images/books/2 Timothy.png";
import TitusImage from "../../assets/images/books/Titus.png";
import PhilemonImage from "../../assets/images/books/Philemon.png";
import HebrewsImage from "../../assets/images/books/Hebrews.png";
import JamesImage from "../../assets/images/books/James.png";
import FirstPeterImage from "../../assets/images/books/1 Peter.png";
import SecondPeterImage from "../../assets/images/books/2 Peter.png";
import FirstJohnImage from "../../assets/images/books/1 John.png";
import SecondJohnImage from "../../assets/images/books/2 John.png";
import ThirdJohnImage from "../../assets/images/books/3 John.png";
import JudeImage from "../../assets/images/books/Jude.png";
import RevelationImage from "../../assets/images/books/Revelation.png";

// Book Images Mapping Object
export const bookImages: { [key: string]: any } = {
  // Old Testament
  Genesis: GenesisImage,
  Exodus: ExodusImage,
  Leviticus: LeviticusImage,
  Numbers: GenesisImage, // Fallback - add when available
  Deuteronomy: DeuteronomyImage,
  Joshua: JoshuaImage,
  Judges: JudgesImage,
  Ruth: RuthImage,
  "1 Samuel": FirstSamuelImage,
  "2 Samuel": SecondSamuelImage,
  "1 Kings": FirstKingsImage,
  "2 Kings": SecondKingsImage,
  "1 Chronicles": FirstChroniclesImage,
  "2 Chronicles": SecondChroniclesImage,
  Ezra: EzraImage,
  Nehemiah: NehemiahImage,
  Esther: EstherImage,
  Job: JobImage,
  Psalms: PsalmsImage,
  Proverbs: ProverbsImage,
  Ecclesiastes: EcclesiastesImage,
  "Song of Songs": SongOfSongsImage,
  Isaiah: IsaiahImage,
  Jeremiah: JeremiahImage,
  Lamentations: LamentationsImage,
  Ezekiel: EzekielImage,
  Daniel: DanielImage,
  Hosea: HoseaImage,
  Joel: JoelImage,
  Amos: AmosImage,
  Obadiah: ObadiahImage,
  Jonah: JonahImage,
  Micah: MicahImage,
  Nahum: NahumImage,
  Habakkuk: HabakkukImage,
  Zephaniah: ZephaniahImage,
  Haggai: HaggaiImage,
  Zechariah: ZechariahImage,
  Malachi: MalachiImage,

  // New Testament
  Matthew: MatthewImage,
  Mark: MarkImage,
  Luke: LukeImage,
  John: JohnImage,
  Acts: ActsImage,
  Romans: RomansImage,
  "1 Corinthians": FirstCorinthiansImage,
  "2 Corinthians": SecondCorinthiansImage,
  Galatians: GalatiansImage,
  Ephesians: EphesiansImage,
  Philippians: PhilippiansImage,
  Colossians: ColossiansImage,
  "1 Thessalonians": FirstThessaloniansImage,
  "2 Thessalonians": SecondThessaloniansImage,
  "1 Timothy": FirstTimothyImage,
  "2 Timothy": SecondTimothyImage,
  Titus: TitusImage,
  Philemon: PhilemonImage,
  Hebrews: HebrewsImage,
  James: JamesImage,
  "1 Peter": FirstPeterImage,
  "2 Peter": SecondPeterImage,
  "1 John": FirstJohnImage,
  "2 John": SecondJohnImage,
  "3 John": ThirdJohnImage,
  Jude: JudeImage,
  Revelation: RevelationImage,
};

// Helper function to get book image with fallback
export const getBookImage = (
  bookName: string,
  fallbackBookName: string = "Genesis"
): any => {
  return bookImages[bookName] || bookImages[fallbackBookName] || GenesisImage;
};
