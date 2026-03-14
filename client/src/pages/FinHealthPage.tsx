import FinHealthResult from '../components/FinHealthResult';
import { profileService } from '../services/api';
import Button from '../components/Button';

const FinHealthPage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [swot, setSwot] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err) {
        // Not found is fine, we'll show the form
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSuccess = async (formData: any) => {
    setLoading(true);
    try {
      const result = await profileService.upsertProfile(formData);
      setProfile(result.profile);
      setSwot(result.swot);
    } catch (err) {
      console.error('Failed to save profile', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-text">Financial Health Score</h1>
        <p className="text-gray-500 mt-2">Get personalized insights and a SWOT analysis of your money.</p>
      </div>

      {profile && (scoreIsReady(profile) || swot) ? (
        <div className="space-y-10">
          <FinHealthResult 
            score={profile.finHealthScore} 
            swot={swot || generatePlaceholderSwot(profile)} 
            data={profile} 
          />
          <div className="text-center">
            <Button variant="outline" onClick={() => setProfile(null)}>Recalculate Score</Button>
          </div>
        </div>
      ) : (
        <FinHealthForm onSuccess={handleSuccess} />
      )}
    </div>
  );
};

// Helper to determine if we should show results
function scoreIsReady(profile: any) {
  return profile && profile.finHealthScore !== undefined;
}

// Fallback generator if swot didn't come back (e.g. from getProfile)
function generatePlaceholderSwot(_profile: any) {
  // This could be a call to the backend or a frontend mirror of the logic
  return {
    strengths: ['Income tracked'],
    weaknesses: ['Evaluation in progress'],
    opportunities: ['Keep updating your data'],
    threats: ['N/A']
  };
}

export default FinHealthPage;
