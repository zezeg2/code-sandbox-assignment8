import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PodcastsService } from "./podcasts.service";
import { Podcast } from "./entities/podcast.entity";
import { CreatePodcastInput, CreatePodcastOutput } from "./dtos/create-podcast.dto";
import { CoreOutput } from "../common/dtos/output.dto";
import {
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput,
  PodcastOutput,
  PodcastSearchInput
} from "./dtos/podcast.dto";
import { UpdatePodcastInput } from "./dtos/update-podcast.dto";
import { Episode } from "./entities/episode.entity";
import { CreateEpisodeInput, CreateEpisodeOutput } from "./dtos/create-episode.dto";
import { UpdateEpisodeInput } from "./dtos/update-episode.dto";
import { Role } from "src/auth/role.decorator";
import { SearchPodcastInput, SearchPodcastOutput } from "./dtos/search-podcast.dto";
import { SubscribePodcastInput, SubscribePodcastOutput } from "./dtos/subscribe-podcast.dto";
import { AuthUser } from "../auth/auth-user.decorator";
import { SeeSubscriptionsOutput } from "./dtos/see-subscriptions.dto";
import { MarkEpisodeAsPlayedInput, MarkEpisodeAsPlayedOutput } from "./dtos/mark-episode-played.dto";
import { UserRole } from "../users/entities/user.entity";

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation(() => CreatePodcastOutput)
  @Role(["Host"])
  createPodcast(
    @Args("input") createPodcastInput: CreatePodcastInput
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query(() => PodcastOutput)
  getPodcast(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation(() => CoreOutput)
  @Role(["Host"])
  deletePodcast(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation(() => CoreOutput)
  @Role(["Host"])
  updatePodcast(
    @Args("input") updatePodcastInput: UpdatePodcastInput
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }
  
  @Query(() => SearchPodcastOutput)
  @Role([UserRole.Listener])
  async searchPodcastByTitle(@Args() searchPodcastInput:SearchPodcastInput ): Promise<SearchPodcastOutput>{
    return await this.podcastsService.searchPodcastByTitle(searchPodcastInput)
  }
  
  @Mutation(() => SubscribePodcastOutput)
  @Role([UserRole.Listener])
  async subscribePodcast(@AuthUser() user, @Args('input') subscribePodcastInput:SubscribePodcastInput){
    return await this.podcastsService.subscribePodcast(user, subscribePodcastInput);
  }
  
  @Query(() => SeeSubscriptionsOutput)
  @Role([UserRole.Listener])
  async seeSubscriptions(@AuthUser() user){
    return await this.podcastsService.seeSubscriptions(user)
  }
}

@Resolver(() => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query(() => EpisodesOutput)
  getEpisodes(
    @Args("input") podcastSearchInput: PodcastSearchInput
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation(() => CreateEpisodeOutput)
  @Role(["Host"])
  createEpisode(
    @Args("input") createEpisodeInput: CreateEpisodeInput
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation(() => CoreOutput)
  @Role(["Host"])
  updateEpisode(
    @Args("input") updateEpisodeInput: UpdateEpisodeInput
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation(() => CoreOutput)
  @Role(["Host"])
  deleteEpisode(
    @Args("input") episodesSearchInput: EpisodesSearchInput
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }
  
  @Mutation(() => MarkEpisodeAsPlayedOutput)
  @Role([UserRole.Listener])
  async markEpisodeAsPlayed(@AuthUser() user, @Args('input')markEpisodeAsPlayedInput: MarkEpisodeAsPlayedInput): Promise<MarkEpisodeAsPlayedOutput>{
    return await this.podcastService.markEpisodeAsPlayed(user, markEpisodeAsPlayedInput)
  }
}
